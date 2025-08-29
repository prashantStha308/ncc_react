namespace backend.DTO;

public class TaskListRequest(string name, string? desc)
{
    public string Name { get; set; } = name;
    public string? Desc { get; set; } = desc;
}
