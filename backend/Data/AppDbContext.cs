using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<UserModel> UserSet { get; set; }
    public DbSet<TaskItem> TaskSet { get; set; }
    public DbSet<TaskList> ListSet { get; set; }
}
