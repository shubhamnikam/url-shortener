using Microsoft.EntityFrameworkCore;
using Url.Shortener.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add cors
const string CORS_POLICY_NAME = "all_allow";
builder.Services.AddCors((options) =>
{
    options.AddPolicy(CORS_POLICY_NAME,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

//setup sqlserver - dbcontext
builder.Services.AddDbContext<UrlDbContext>(option =>
{
    option.UseSqlServer(builder
        .Configuration
        .GetValue<string>("ConnectionStrings:DefaultConnection"));
});

builder.Services.AddScoped<IUrlRepository, UrlRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseCors(CORS_POLICY_NAME);

app.UseAuthorization();

app.MapControllers();

app.Run();
