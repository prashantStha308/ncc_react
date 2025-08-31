using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class TaskList
{
    [Key]
    public Guid ListId { get; set; } = Guid.NewGuid();
    public Guid OwnerId { get; set; }

    public string Name { get; set; }
    public string? Desc { get; set; }

    public int TaskCount { get; set; }
    public int CompletedTaskCount { get; set; }
    public bool IsCompleted { get; set; } = false;

    public DateTime DateCreated { get; init; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; }
    
    public List<TaskItem> List { get; set; } = new List<TaskItem>();


    // Deafult constructor for EF
    public TaskList() { }

    public TaskList(string name, string? desc)
    {
        Name = name;
        Desc = desc;
        LastUpdated = DateTime.UtcNow;
    }

    public TaskList(Guid ownerId, string name, string? desc)
    {
        OwnerId = ownerId;
        Name = name;
        Desc = desc;
        TaskCount = 0;
        CompletedTaskCount = 0;
        LastUpdated = DateTime.UtcNow;
    }
}