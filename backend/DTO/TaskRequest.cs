namespace backend.DTO;

public class TaskRequest(string? name, string? desc)
{
    public string? Name { get; set; } = name;
    public string? Desc { get; set; } = desc;
}


public class TaskRequest_status(int status = 0)
{
    public int Status { get; set; } = status;
}
