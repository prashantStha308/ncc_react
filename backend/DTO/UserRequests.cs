namespace backend.DTO;

public class UserRequests_Register( string userName, string email, string password)
{
    public string Username { get; set; } = userName; 
    public string Email { get; set; } = email;
    public string Password { get; set; } = password;
}

public class UserRequests_Login( string email, string password )
{
    public string Email { get; set; } = email;
    public string Password { get; set; } = password;
}

public class UserRequests_Update(string userName, string email)
{
    public string? Username { get; set; } = userName;
    public string? Email { get; set; } = email;
}