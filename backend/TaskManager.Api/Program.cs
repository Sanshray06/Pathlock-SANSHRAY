using TaskManager.Api.Repositories;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Register repository
builder.Services.AddSingleton<ITaskRepository, InMemoryTaskRepository>();

// Add controllers with JSON options for camelCase serialization
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors();
app.MapControllers();
app.Run();