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
    private readonly RepositoryHelper _repo;

    public TaskServices(AppDbContext context, RepositoryHelper repo)
    {
        _context = context;
        _repo = repo;
    }

    public TaskResult AddTaskInList(Guid listId, TaskRequest requestDto)
    {
        try
        {
            TaskItem newTask = new(listId, requestDto.Name, requestDto.Desc);
            _repo.AddDataToContextAndSave<TaskItem>(newTask);

            return TaskResult.Ok(newTask, "Task added successfully", 201);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public Result<List<TaskItem>> GetAllTasks()
    {
        try
        {
            List<TaskItem> tasks = _repo.GetAllData<TaskItem>();
            return Result<List<TaskItem>>.Ok(tasks, "Fetched All Tasks", 200);
        }
        catch (ApiError e)
        {
            return Result<List<TaskItem>>.Fail(e);
        }
    }


    public TaskResult DeleteTaskById(Guid taskId)
    {
        try
        {
            _repo.DeleteDataByIdAndSave<TaskItem>(taskId);

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
            TaskItem target = _repo.GetDataById<TaskItem>(taskId);

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
            TaskItem? target = _repo.GetDataById<TaskItem>(taskId);

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
            TaskItem? target = _repo.GetDataById<TaskItem>(taskId);

            return Result<bool>.Ok("Toggled task's Status", 200);
        }
        catch (ApiError e)
        {
            return Result<bool>.Fail(e);
        }
    }
}