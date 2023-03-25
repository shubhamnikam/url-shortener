FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Url.Shortener.API/Url.Shortener.API.csproj", "Url.Shortener.API/"]
RUN dotnet restore "Url.Shortener.API/Url.Shortener.API.csproj"
COPY . .
WORKDIR "/src/Url.Shortener.API"
RUN dotnet build "Url.Shortener.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Url.Shortener.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Url.Shortener.API.dll"]