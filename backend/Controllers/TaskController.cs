using backend.DTO;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _services;
        public TaskController(ITaskService services)
        {
            _services = services;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAllUserTasks(Guid userId)
        {
            var res = _services.GetAllTasks(userId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpGet("recently-updated")]
        public IActionResult GetRecentlyUpdated()
        {
            var limitString = Request.Query["limit"];

            int limit = 10; 
            if (!string.IsNullOrEmpty(limitString) && int.TryParse(limitString, out var parsed))
            {
                limit = parsed;
            }

            var res = _services.GetLatestUpdatedTasks(limit);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPost("{listId}/add")]
        public IActionResult AddTask(Guid listId, [FromBody] TaskRequest requestDto)
        {
            var res = _services.AddTaskInList(listId, requestDto);
            if (!res.Success) return BadRequest(res);

            return Created("", res);
        }

        [HttpGet("{taskId}")]
        public IActionResult GetTaskById(Guid taskId)
        {
            var res = _services.GetTaskById(taskId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPatch("toggle/{taskId}")]
        public IActionResult ToggleTaskCompletion(Guid taskId, [FromBody] TaskRequest_status status)
        {
            var res = _services.ToggleTaskStatusById(taskId, status);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPatch("{taskId}")]
        public IActionResult UpdateTask(Guid taskId, [FromBody] TaskRequest updateBody)
        {
            var res = _services.UpdateTaskById(taskId, updateBody);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(Guid taskId)
        {
            var res = _services.DeleteTaskById(taskId);
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

    }
}
