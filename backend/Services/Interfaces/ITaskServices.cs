using System;
using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

using TaskResult = backend.Models.Result<backend.Models.TaskItem>;

public interface ITaskService
{
    TaskResult AddTaskInList(Guid listId, TaskRequest requestDto);
    TaskResult DeleteTaskById(Guid taskId);
    TaskResult UpdateTaskById(Guid taskId, TaskRequest requestDto);
    TaskResult GetTaskById(Guid taskId);
    Result<bool> ToggleTaskStatusById(Guid taskId);
}