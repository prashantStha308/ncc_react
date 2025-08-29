using System;
using System.ComponentModel.DataAnnotations;
using backend.Helpers;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace backend.Models;

public class UserModel
{
    [Key]
    public Guid User_Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }
    
    public DateTime DateCreated { get; init; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; }


    // For EF
    public UserModel() { }

    public UserModel(string userName, string email, string password)
    {
        Username = userName;
        Email = email;
        Password = password;
        LastUpdated = DateTime.UtcNow;
    }

}
