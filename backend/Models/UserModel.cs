using System;

namespace backend.Models;

public class UserModel
{
    public string User_Id { get; set; } = "";
    public string Username { get; private set; } = "";
    public string First_Name { get; set; } = "";
    public string Phone_Number { get; set; } = "";
}
