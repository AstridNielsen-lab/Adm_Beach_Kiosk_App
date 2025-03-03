using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace AdmBeachApp.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> AutenticarUsuarioAsync(string googleId, string nome, string email)
        {
            var usuario = new
            {
                GoogleId = googleId,
                Nome = nome,
                Email = email
            };

            var response = await _httpClient.PostAsJsonAsync("http://localhost:5209/api/auth/login", usuario);
            return response.IsSuccessStatusCode;
        }
    }
}
