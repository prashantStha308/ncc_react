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
            TaskList target = _repo.GetDataById<TaskList>(listId);

            TaskItem newTask = new(listId,target.OwnerId, target.Name, requestDto.Name!, requestDto.Desc);
            target.List.Add(newTask);
            target.TaskCount++;

            _context.TaskSet.Add(newTask);
            _context.SaveChanges();

            return TaskResult.Ok(newTask, "Task added successfully", 201);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public Result<List<TaskItem>> GetAllTasks(Guid userId)
    {
        try
        {
            List<TaskItem> tasks = _repo.GetAllData<TaskItem>(userId, includeTasks: true);
            return Result<List<TaskItem>>.Ok(tasks, "Fetched All Tasks", 200);
        }
        catch (ApiError e)
        {
            return Result<List<TaskItem>>.Fail(e);
        }
    }

    public Result<List<TaskItem>> GetAllTasks()
    {
        try
        {
            List<TaskItem> tasks = _repo.GetAllData<TaskItem>(includeTasks: true);
            return Result<List<TaskItem>>.Ok(tasks, "Fetched All Tasks", 200);
        }
        catch (ApiError e)
        {
            return Result<List<TaskItem>>.Fail(e);
        }
    }

    public Result<List<TaskItem>> GetLatestUpdatedTasks(int limit)
    {
        try
        {
            List<TaskItem> tasks = _context.TaskSet.OrderByDescending(t => t.LastUpdated).Take(limit).ToList();

            return Result<List<TaskItem>>.Ok(tasks, "Fetched Latest Tasks");
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
            TaskItem target = _repo.GetDataById<TaskItem>(taskId);
            _context.TaskSet.Remove(target);

            TaskList targetList = _repo.GetDataById<TaskList>(target.ListId);
            if (targetList != null && targetList.TaskCount > 0) targetList.TaskCount--;

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
            TaskItem target = _repo.GetDataById<TaskItem>(taskId);

            return TaskResult.Ok(target, "Successfully Fetched Task", 200);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }

    public TaskResult ToggleTaskStatusById(Guid taskId, TaskRequest_status status)
    {
        try
        {
            TaskItem target = _repo.GetDataById<TaskItem>(taskId);
            TaskList taskList = _repo.GetDataById<TaskList>(target.ListId);

            int prevStatus = target.Status;

            // Deafult to prevStatus if status.Status is not in range of [0,2]
            int _status = (status.Status >= 0 && status.Status <= 2) ? status.Status : prevStatus;
            target.Status = _status;

            if (_status == 2)
            {
                target.IsCompleted = true;
                taskList.CompletedTaskCount = taskList.CompletedTaskCount >= taskList.List.Count ? taskList.List.Count : taskList.List.Count + 1;

            }
            if ((_status == 0 || _status == 1) && prevStatus == 2 )
            {
                taskList.CompletedTaskCount--;
                taskList.IsCompleted = false;
            }

            _context.SaveChanges();

            return TaskResult.Ok(target, "Toggled task's Status", 200);
        }
        catch (ApiError e)
        {
            return TaskResult.Fail(e);
        }
    }
}