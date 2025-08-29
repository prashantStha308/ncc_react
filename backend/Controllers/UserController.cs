using backend.DTO;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _services;

        public UserController(IUserServices services)
        {
            _services = services;
        }

        [HttpPost("")]
        public IActionResult Register([FromBody] UserRequests_Register register)
        {
            var res = _services.Register(register);
            if (!res.Success) return BadRequest(res);

            return Created("", res);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserRequests_Login login)
        {
            var res = _services.LogIn(login);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpGet("list/{userId}")]
        public IActionResult GetAllUserLists(Guid userId)
        {
            var res = _services.GetAllUserLists(userId);
            
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(Guid userId)
        {
            var res = _services.DeleteUserById(userId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

    }
}
