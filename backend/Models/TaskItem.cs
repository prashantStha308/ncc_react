using System;

namespace backend.Models;

public class TaskItem(Guid listId, string name, string desc)
{
    public string TaskName { get; set; } = name;
    public string Desc { get; set; } = desc;
    public bool IsCompleted { get; set; } = false;
    public DateTime DateCreated { get; } = DateTime.UtcNow;
    public Guid TaskId { get; set; } = Guid.NewGuid();
    public Guid ListId { get; set; } = listId;
}
