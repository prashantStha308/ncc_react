using backend.DTO;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasklistController : ControllerBase
    {
        private readonly ITaskListServices _services;

        public TasklistController(ITaskListServices services)
        {
            _services = services;
        }

        [HttpPost("")]
        public IActionResult CreateList([FromBody] TaskListRequest request)
        {
            var res = _services.CreateList(request);
            if (!res.Success) return BadRequest(res);

            return Created("", res);
        }

        [HttpGet("")]
        public IActionResult GetAllLists()
        {
            var res = _services.GetAllLists();
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

    }
}
