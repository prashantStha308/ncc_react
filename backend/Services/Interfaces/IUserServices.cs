using backend.Models;
using backend.DTO;

namespace backend.Services.Interfaces;

using UserResult = Result<UserModel>;
using UserRes = Result<UserResponse>;

public interface IUserServices
{
    public UserResult Register(UserRequests_Register registerDto);

    public UserRes LogIn(UserRequests_Login loginDto);
    public Result<List<TaskList>> GetAllUserLists(Guid userId);
    public UserRes UpdateUserById(Guid UserId, UserRequests_Update updateDto);
    public UserResult DeleteUserById(Guid UserId);
}
