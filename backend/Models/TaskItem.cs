using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class TaskItem
{
    public string TaskName { get; set; }
    public string? Desc { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime DateCreated { get; init; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; }
    [Key]
    public Guid TaskId { get; set; } = Guid.NewGuid();
    public Guid ListId { get; set; }

    // Default Constructr for EF
    public TaskItem() { }

    public TaskItem(Guid listId, string name, string? desc = "No Description Available")
    {
        ListId = listId;
        TaskName = name;
        Desc = desc;
        IsCompleted = false;
        LastUpdated = DateTime.UtcNow;
    }
}
