using backend.Constants;
using backend.Data;
using backend.DTO;
using backend.Helpers;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services;

// Setting Aliases
using TaskResult = Result<TaskItem>;

public class TaskServices : ITaskService
{
    private readonly AppDbContext _context;

    public TaskServices(AppDbContext context)
    {
        _context = context;
    }

    public TaskResult AddTaskInList(Guid listId, TaskRequest requestDto)
    {
        try
        {
            TaskItem newTask = new(listId, requestDto.Name, requestDto.Desc);

            _context.TaskSet.Add(newTask);
            _context.SaveChanges();

            return TaskResult.Ok(newTask, "Task added successfully", 201);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public TaskResult DeleteTaskById(Guid taskId)
    {
        try
        {
            TaskItem? target = _context.TaskSet.FirstOrDefault(item => item.TaskId == taskId);

            if (target == null) return TaskResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskItem", taskId), 404);

            _context.TaskSet.Remove(target);
            _context.SaveChanges();

            return TaskResult.Ok("Deleted Task successfully", 200);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }


    public TaskResult UpdateTaskById(Guid taskId, TaskRequest requestDto)
    {
        try
        {
            TaskItem? target = _context.TaskSet.FirstOrDefault(task => task.TaskId == taskId);

            if (target == null) return TaskResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskItem", taskId), 404);

            if (requestDto.Name != null) target.TaskName = requestDto.Name;
            if (requestDto.Desc != null) target.Desc = requestDto.Desc;

            _context.SaveChanges();

            return TaskResult.Ok(target, "Task Updated Successfully", 200);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public TaskResult GetTaskById(Guid taskId)
    {
        try
        {
            TaskItem? target = _context.TaskSet.FirstOrDefault(task => task.TaskId == taskId);

            if (target == null) return TaskResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskItem", taskId), 404);

            return TaskResult.Ok(target, "Successfully Fetched Task", 200);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public Result<bool> ToggleTaskStatusById(Guid taskId)
    {
        try
        {
            TaskItem? target = _context.TaskSet.FirstOrDefault(task => task.TaskId == taskId);

            if (target == null) return Result<bool>.Fail(ErrorMessages.ItemNotFoundWithId("TaskItem", taskId), 404);

            return Result<bool>.Ok("Toggled task's Status", 200);
        }
        catch (ApiError e)
        {
            return Result<bool>.Fail(e);
        }
    }
}