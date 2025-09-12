namespace backend.DTO;

public class TaskListResponse(Guid id, string name, string? desc)
{
    public Guid ListId { get; set; } = id;
    public string Name { get; set; } = name;
    public string? Desc { get; set; } = desc;
}
