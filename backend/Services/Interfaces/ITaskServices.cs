using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

using TaskResult = Result<TaskItem>;

public interface ITaskService
{
    TaskResult AddTaskInList(Guid listId, TaskRequest requestDto);
    Result<List<TaskItem>> GetAllTasks(Guid ownerId);
    Result<List<TaskItem>> GetAllTasks();
    Result<List<TaskItem>> GetLatestUpdatedTasks(int limit);
    TaskResult DeleteTaskById(Guid taskId);
    TaskResult UpdateTaskById(Guid taskId, TaskRequest requestDto);
    TaskResult GetTaskById(Guid taskId);
    TaskResult ToggleTaskStatusById(Guid taskId, TaskRequest_status status);
}