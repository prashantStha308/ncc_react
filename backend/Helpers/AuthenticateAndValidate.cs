using backend.Constants;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
namespace backend.Helpers;

public class AuthenticateAndValidate
{
    private readonly PasswordHasher<UserModel> _hasher = new();
    private readonly AppDbContext _context;

    public AuthenticateAndValidate( AppDbContext context ) {
        _context = context;
    }
    /*
    *=========================
    * Hashing Password
    *=========================
    * 
    * Initial Read: https://www.reddit.com/r/dotnet/comments/1fxjgov/best_practices_for_hashing_and_verifying/
    * Second Read: https://stackoverflow.com/questions/4181198/how-to-hash-a-password#10402129
    * Third Read: https://www.reddit.com/r/dotnet/comments/1fxjgov/comment/lqn7qbu/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
    * Fourth Read: https://github.com/dotnet/AspNetCore/blob/main/src/Identity/Extensions.Core/src/PasswordHasher.cs
    *
    */
    public string GetHashedPassword(UserModel? User, string password)
    {
        return _hasher.HashPassword(User, password);
    }

    public bool VerifyPassword(UserModel user, string hashedPassword, string password)
    {
        var result = _hasher.VerifyHashedPassword(user, hashedPassword, password);
        return result == PasswordVerificationResult.Success;
    }

    public T ValidateExistance<T>(T? target) where T : class
    {
        if (target == null) throw new ApiError("Target Not Found", 404);
        return target;
    }

    public T GetDataById<T>(Guid id) where T : class
    {
        T? target = _context.Set<T>().Find(id);

        if (target == null)
            throw new ApiError($"{typeof(T).Name} not found", 404);

        return target;
    }

}
