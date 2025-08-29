using System;

namespace backend.DTO;

public class TaskRequest(string name, string? desc)
{
    public string Name { get; set; } = name;
    public string? Desc { get; set; } = desc;
}
