using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using backend.Data;
using backend.DTO;
using backend.Helpers;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

using UserResult = Result<UserModel>;
using UserRes = Result<UserResponse>;

public class UserServices : IUserServices
{
    private readonly AppDbContext _context;
    private readonly AuthenticateAndValidate _auth;
    private readonly RepositoryHelper _repo;
    public UserServices(AppDbContext context, AuthenticateAndValidate auth, RepositoryHelper repo)
    {
        _context = context;
        _auth = auth;
        _repo = repo;
    }

    private UserModel GetUserByEmail(string email)
    {
        if (!new EmailAddressAttribute().IsValid(email))
            throw new ApiError("Invalid Email.", 400);

        var user = _auth.ValidateExistance( _context.UserSet.FirstOrDefault(u => u.Email == email) );

        return user;
    }

    private void ValidateUserEmail(string email)
    {
        if (!new EmailAddressAttribute().IsValid(email))
            throw new ApiError("Invalid Email.", 400);

        if (_context.UserSet.Any(u => u.Email == email))
            throw new ApiError("User with this email already exists.", 400);
    }

    public UserRes Register(UserRequests_Register registerDto)
    {
        try
        {
            ValidateUserEmail(registerDto.Email);

            // Generate hashed Password
            string hashedPassword = _auth.GetHashedPassword(null, registerDto.Password);

            UserModel newUser = new(registerDto.Username, registerDto.Email, hashedPassword);

            _context.UserSet.Add(newUser);
            _context.SaveChanges();
            
            UserResponse SafeRes = new(newUser.Username, newUser.User_Id);
            return UserRes.Ok(SafeRes, "Registered User Successfully");
        }
        catch (ApiError e)
        {
            return UserRes.Fail(e);
        }
    }

    public UserRes LogIn(UserRequests_Login loginDto)
    {
        try
        {
            UserModel? target = GetUserByEmail(loginDto.Email);

            if (!_auth.VerifyPassword(target, target.Password, loginDto.Password))
                return UserRes.Fail("Invalid Credentials", 401);

            UserResponse SafeRes = new(target.Username, target.User_Id);
            return UserRes.Ok(SafeRes, "User logged In.");
        }
        catch (ApiError e)
        {
            return UserRes.Fail(e);
        }
    }

    public Result<List<TaskList>> GetAllUserLists(Guid userId)
    {
        try
        {
            List<TaskList> usersList = _context.ListSet.Where(l => l.OwnerId == userId).ToList();
            return Result<List<TaskList>>.Ok(usersList, "Lists associated with user of provided userId has been fetched");
        }
        catch (ApiError e)
        {
            return Result<List<TaskList>>.Fail(e);
        }
    }

    public UserRes UpdateUserById(Guid UserId, UserRequests_Update updateDto)
    {
        try
        {
            UserModel? target = _repo.GetDataById<UserModel>(UserId);

            if (!string.IsNullOrEmpty(updateDto.Email))
            {
                if (!new EmailAddressAttribute().IsValid(updateDto.Email))
                {
                    throw new ApiError("Invalid Email", 400);
                }
                target.Email = updateDto.Email!;
            }

            if (!string.IsNullOrEmpty(updateDto.Username)) target.Username = updateDto.Username;

            _context.SaveChanges();
            UserResponse SafeRes = new(target.Username, target.User_Id);

            return UserRes.Ok(SafeRes, "Updated User Successfully");
        }
        catch (ApiError e)
        {
            return UserRes.Fail(e);
        }
    }
    public UserResult DeleteUserById(Guid UserId)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            _context.TaskSet
                .Where(task => _context.ListSet
                    .Where(list => list.OwnerId == UserId)
                    .Select(list => list.ListId)
                    .Contains(task.ListId))
                .ExecuteDelete();

            _context.ListSet
                .Where(list => list.OwnerId == UserId)
                .ExecuteDelete();

            _context.UserSet
                .Where(user => user.User_Id == UserId)
                .ExecuteDelete();

            transaction.Commit();

            return UserResult.Ok("Successfully Deleted the User");
        }
        catch (Exception e)
        {
            transaction.Rollback();
            return UserResult.Fail(new ApiError(e.Message));
        }
    }

}
