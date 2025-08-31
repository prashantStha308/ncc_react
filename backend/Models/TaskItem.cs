using System;
using System.ComponentModel.DataAnnotations;
using backend.Constants;

namespace backend.Models;

public class TaskItem
{
    [Key]
    public Guid TaskId { get; set; }
    public Guid ListId { get; set; }
    public Guid OwnerId { get; set; }
    public string ParentList { get; set; }

    public string TaskName { get; set; }
    public string? Desc { get; set; }

    public bool IsCompleted { get; set; }
    public int Status { get; set; }
    
    public DateTime DateCreated { get; init; }
    public DateTime LastUpdated { get; set; }

    // Default Constructr for EF
    public TaskItem() { }

    public TaskItem(Guid listId, Guid ownerId, string listName, string name, string? desc = "No Description Available")
    {
        TaskId = Guid.NewGuid();
        ParentList = listName;
        ListId = listId;
        OwnerId = ownerId;

        TaskName = name;
        Desc = desc;

        IsCompleted = false;
        Status = 0;

        DateCreated = DateTime.UtcNow;
        LastUpdated = DateTime.UtcNow;
    }
}
