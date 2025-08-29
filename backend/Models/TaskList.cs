using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class TaskList
{
    public string Name { get; set; }
    public string Desc { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateTime DateCreated { get; init; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; }
    public List<TaskItem> List { get; set; } = new List<TaskItem>();

    public Guid OwnerId { get; set; }
    [Key]
    public Guid ListId { get; set; } = Guid.NewGuid();

    // Deafult constructor for EF
    public TaskList() { }

    public TaskList(string name, string desc)
    {
        Name = name;
        Desc = desc;
        LastUpdated = DateTime.UtcNow;
    }

    public TaskList(Guid ownerId, string name, string desc)
    {
        OwnerId = ownerId;
        Name = name;
        Desc = desc;
        LastUpdated = DateTime.UtcNow;
    }
}