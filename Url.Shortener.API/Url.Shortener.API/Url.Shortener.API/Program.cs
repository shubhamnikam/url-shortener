using Url.Shortener.API.Options;
using Url.Shortener.API.Service;
using Url.Shortener.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add cors
const string CORS_POLICY_NAME = "allow_all";
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


//config to model using options pattern
builder.Services.Configure<ExtraConfigOptions>(builder.Configuration.GetSection("ExtraConfig"));


//add mongodb support
builder.Services.AddScoped<IMongoDbService, MongoDbService>();

//add app services
builder.Services.AddScoped<IUrlService, UrlService>();

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
