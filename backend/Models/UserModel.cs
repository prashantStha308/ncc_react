using System;
using System.ComponentModel.DataAnnotations;
using backend.Helpers;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace backend.Models;

public class UserModel
{
    [Key]
    public Guid User_Id { get; set; }
    public string Username { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; }

    public List<TaskItem> Bookmarked { get; set; } = new List<TaskItem>();
    
    public DateTime DateCreated { get; init; }
    public DateTime LastUpdated { get; set; }


    // For EF
    public UserModel() { }

    public UserModel(string userName, string email, string password)
    {
        User_Id = Guid.NewGuid();
        Username = userName;
        Email = email;
        Password = password;
        
        DateCreated = DateTime.UtcNow;
        LastUpdated = DateTime.UtcNow;
    }

}
