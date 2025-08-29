using backend.Data;
using backend.DTO;
using backend.Helpers;
using backend.Models;
using backend.Services.Interfaces;


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
    public ListResult CreateList( TaskListRequest request )
    {
        try
        {
            TaskList NewList = new(request.Name, request.Desc!);
            _repo.AddDataToContextAndSave<TaskList>(NewList);

            return ListResult.Ok(NewList, "List Created successfully", 201);
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
            _repo.DeleteDataByIdAndSave<TaskList>(listId);
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
            if (request.Name != null) target.Desc = request.Desc;

            _context.SaveChanges();
            return ListResult.Ok("List Updated Successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public Result<List<TaskList>> GetAllLists()
    {
        try
        {
            List<TaskList> taskLists = _repo.GetAllData<TaskList>();
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
            TaskList? target = _repo.GetDataById<TaskList>(listId);

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
            TaskList? target = _repo.GetDataById<TaskList>(listId);

            target.IsCompleted = !target.IsCompleted;
            _context.SaveChanges();

            return ListResult.Ok(target, "Updated list status successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }
}
