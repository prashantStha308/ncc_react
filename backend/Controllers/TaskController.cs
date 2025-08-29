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

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var res = _services.GetAllTasks();
            if (!res.Success) return BadRequest(res);

            return Ok(res);
        }

        [HttpPost("{listId}/tasks")]
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
        public IActionResult ToggleTaskCompletion(Guid taskId)
        {
            var res = _services.ToggleTaskStatusById(taskId);
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
