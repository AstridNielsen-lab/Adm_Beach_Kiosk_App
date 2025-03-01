using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using API_Backend.Models;
using API_Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Configuração CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Configuração de autenticação com Google
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie("Cookies")
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"] ?? string.Empty;
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"] ?? string.Empty;
});

// Configuração do contexto de banco de dados com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowAll"); // Habilitando CORS

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/login-google", async (HttpContext context) =>
{
    var properties = new AuthenticationProperties { RedirectUri = "/google-login" };
    await context.ChallengeAsync(GoogleDefaults.AuthenticationScheme, properties);
});

app.MapPost("/google-login", async (HttpContext context, AppDbContext dbContext) =>
{
    var authenticateResult = await context.AuthenticateAsync("Cookies");
    if (!authenticateResult.Succeeded)
    {
        return Results.Unauthorized();
    }

    var nome = authenticateResult.Principal?.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
    var email = authenticateResult.Principal?.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

    if (string.IsNullOrEmpty(nome) || string.IsNullOrEmpty(email))
    {
        return Results.BadRequest("Erro ao obter dados do usuário.");
    }

    var usuarioExistente = await dbContext.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
    if (usuarioExistente == null)
    {
        var usuario = new Usuario
        {
            Nome = nome,
            Email = email
        };
        dbContext.Usuarios.Add(usuario);
        await dbContext.SaveChangesAsync();
        return Results.Ok(usuario);
    }

    return Results.Ok(usuarioExistente);
});


app.UseRouting();

app.Run();
