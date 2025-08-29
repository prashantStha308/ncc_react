using backend.Data;
using backend.Helpers;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

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
// Inject Service classes
builder.Services.AddScoped<ITaskService, TaskServices>();
builder.Services.AddScoped<ITaskListServices, TaskListServices>();
builder.Services.AddScoped<IUserServices, UserServices>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
