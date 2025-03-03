using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Backend.Data;
using API_Backend.Models;

namespace API_Backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            if (usuario == null)
                return BadRequest("Usuário inválido");

            var userExistente = await _context.Usuarios.FirstOrDefaultAsync(u => u.GoogleId == usuario.GoogleId);

            if (userExistente == null)
            {
                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();
                return Ok(usuario);
            }

            return Ok(userExistente);
        }
    }
}
