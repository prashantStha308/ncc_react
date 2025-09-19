using backend.Data;
using backend.DTO;
using backend.Helpers;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;
public class TaskListServices : ITaskListServices
{
    private readonly AppDbContext _context;
    private readonly RepositoryHelper _repo;
    public TaskListServices(AppDbContext context, RepositoryHelper repo)
    {
        _context = context;
        _repo = repo;
    }
    public ListResult CreateList( Guid? userId, TaskListRequest request )
    {
        try
        {
            TaskList newList;
            if (userId.HasValue)
            {
                newList = new TaskList(userId.Value, request.Name, request.Desc ?? "");
            }
            else
            {
                newList = new TaskList(request.Name, request.Desc ?? "");
            }

            _context.ListSet.Add(newList);
            _context.SaveChanges();

            return ListResult.Ok(newList, "List Created successfully", 201);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public ListResult DeleteList(Guid listId)
    {
        try
        {
            _repo.DeleteDataById<TaskList>(listId);

            _context.TaskSet.Where(task => task.ListId == listId).ExecuteDelete();
            _context.SaveChanges();

            return ListResult.Ok("Deleted Task List successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public ListResult UpdateListById(Guid listId, TaskListRequest request)
    {
        try
        {
            TaskList? target = _repo.GetDataById<TaskList>(listId);

            if (request.Name != null) target.Name = request.Name;
            if (request.Desc != null) target.Desc = request.Desc;
            if (request.Name != null || request.Desc != null) target.LastUpdated = DateTime.UtcNow;

            _context.SaveChanges();
            return ListResult.Ok(target, "List Updated Successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public Result<List<TaskList>> GetAllLists(Guid ownerId)
    {
        try
        {
            List<TaskList> taskLists = _repo.GetAllData<TaskList>(ownerId, includeTasks: true);
            return Result<List<TaskList>>.Ok(taskLists, "Fetched all Lists Successfully", 200);
        }
        catch (ApiError e)
        {
            return Result<List<TaskList>>.Fail(e);
        }
    }

    public ListResult GetListById(Guid listId)
    {
        try
        {
            TaskList target = _repo.GetDataById<TaskList>(listId, includeTasks: true);

            return ListResult.Ok(target, "Successfully Fetched List", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public ListResult ToggleListStatusById(Guid listId)
    {
        try
        {
            // Throws error if not found, dw about target being null
            TaskList target = _repo.GetDataById<TaskList>(listId);

            target.IsCompleted = !target.IsCompleted;
            if (target.IsCompleted)
            {
                target.CompletedTaskCount = target.List.Count;
            }
            else
            {
                target.CompletedTaskCount = _context.TaskSet.Count(task => task.ListId == listId && task.IsCompleted);
            }

            _context.SaveChanges();

            return ListResult.Ok(target, "Updated list status successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }
}
