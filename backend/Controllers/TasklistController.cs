using backend.DTO;
using backend.Services.Interfaces;
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

        [HttpGet("{listId}")]
        public IActionResult GetListById(Guid listId)
        {
            var res = _services.GetListById(listId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPatch("toggleAll/{listId}")]
        public IActionResult ToggleList(Guid listId)
        {
            var res = _services.ToggleListStatusById(listId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPatch("{listId}")]
        public IActionResult UpdateList(Guid listId, [FromBody] TaskListRequest request)
        {
            var res = _services.UpdateListById(listId, request);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpDelete("{listId}")]
        public IActionResult DeleteList(Guid listId)
        {
            var res = _services.DeleteList(listId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

    }
}
