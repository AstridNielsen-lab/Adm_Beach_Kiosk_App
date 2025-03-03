using Microsoft.AspNetCore.Components.WebView.Maui;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui.Hosting;
using Microsoft.Maui.Controls.Hosting;
using System;
using System.Net.Http;
using AdmBeachApp.Services;

namespace AdmBeachApp
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();

            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                });

            // Adicionando Blazor WebView
            builder.Services.AddMauiBlazorWebView();

            // Configuração do Serviço da API
            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("http://localhost:5209/") });
            builder.Services.AddScoped<ApiService>();

            return builder.Build();
        }
    }
}
