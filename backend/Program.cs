using backend.Data;
using backend.Helpers;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configure DbContext
builder.Services.AddDbContext<AppDbContext>(option =>
{
    var conn = builder.Configuration.GetConnectionString("DefaultConnection"); 
    option.UseMySql(
        conn,
        ServerVersion.AutoDetect(conn)
    );
});
// Inject Helpers classes
builder.Services.AddScoped<AuthenticateAndValidate>();
builder.Services.AddScoped<RepositoryHelper>();
// Inject Service classes
builder.Services.AddScoped<ITaskService, TaskServices>();
builder.Services.AddScoped<ITaskListServices, TaskListServices>();
builder.Services.AddScoped<IUserServices, UserServices>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173", "https://inc1.devtunnels.ms/")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();

var app = builder.Build();


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseRouting();
app.UseAuthorization();   
app.MapControllers();

app.Run();
