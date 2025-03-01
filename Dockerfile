# Use uma imagem base do .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de solução (opcional se necessário)
COPY *.sln ./

# Restaura as dependências do projeto
RUN dotnet restore

# Copia o restante do código fonte
COPY . ./

# Publica a aplicação
RUN dotnet publish -c Release -o /out

# Usa uma imagem base de runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

WORKDIR /app
COPY --from=build /out .

# Expõe a porta da aplicação
EXPOSE 80

# Comando para rodar a aplicação
ENTRYPOINT ["dotnet", "AdmBeachApp.dll"]
