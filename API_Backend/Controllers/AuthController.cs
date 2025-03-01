using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Backend.Data; // Namespace correto do contexto
using API_Backend.Models; // Namespace correto do modelo Usuario
using System.Threading.Tasks;
using System.Linq;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    // 🔹 Autenticação com Google
    [HttpGet("google")]
    public IActionResult LoginGoogle()
    {
        var clientId = "351591484804-h7pn67gcm1o31t0a4v4g6rq8opm5buee.apps.googleusercontent.com";
        var redirectUri = "http://localhost:5000/api/auth/google/callback";
        var authUrl = $"https://accounts.google.com/o/oauth2/auth?client_id={clientId}&redirect_uri={redirectUri}&response_type=code&scope=email%20profile";

        return Redirect(authUrl);
    }

    [HttpGet("google/callback")]
    public async Task<IActionResult> GoogleCallback(string code)
    {
        if (string.IsNullOrEmpty(code))
            return BadRequest(new { message = "Código inválido!" });

        // Simulação de troca de código por dados do usuário (mockado)
        var userEmail = "email_do_google@gmail.com"; // Aqui seria o retorno da API do Google
        var userName = "Nome do Google"; // Aqui seria o retorno da API do Google

        var usuario = await _db.Usuarios.FirstOrDefaultAsync(u => u.Email == userEmail);

        if (usuario == null)
        {
            var newUser = new Usuario
            {
                Nome = userName,
                Email = userEmail
            };

            _db.Usuarios.Add(newUser);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Usuário cadastrado com sucesso!" });
        }

        return Ok(new { message = "Usuário já existe no banco de dados." });
    }

    // 🔹 Registro de Usuário
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] Usuario usuario)
    {
        if (usuario == null || string.IsNullOrEmpty(usuario.Email))
            return BadRequest(new { message = "Dados inválidos!" });

        _db.Usuarios.Add(usuario);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Usuário registrado com sucesso!" });
    }
} 
