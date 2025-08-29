namespace backend.DTO;

public class UserResponse(string userName, Guid userId)
{
    public string Username { get; set; } = userName;
    public Guid UserId { get; set; } = userId;
}
