using backend.Constants;
using backend.Data;
using backend.DTO;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;
public class TaskListServices : ITaskListServices
{
    private readonly AppDbContext _context;
    private readonly AuthenticateAndValidate _auth;
    public TaskListServices(AppDbContext context, AuthenticateAndValidate auth)
    {
        _context = context;
        _auth = auth;
    }
    public ListResult CreateList( TaskListRequest request )
    {
        try
        {
            TaskList NewList = new(request.Name, request.Desc!);

            _context.ListSet.Add(NewList);
            _context.SaveChanges();

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
            TaskList? target = _auth.GetDataById<TaskList>(listId);

            _context.TaskSet.RemoveRange(target.List);
            _context.ListSet.Remove(target);
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
            TaskList? target = _auth.GetDataById<TaskList>(listId);


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
            List<TaskList> taskLists = _context.ListSet.ToList();

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
            TaskList? target = _auth.GetDataById<TaskList>(listId);

            return ListResult.Ok(target, "Successfully Fetched List", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public Result<bool> CheckAndUpdateListStatusById(Guid listId)
    {
        try
        {
            TaskList? target = _auth.GetDataById<TaskList>(listId);


            target.IsCompleted = target.List.TrueForAll(item => item.IsCompleted);
            _context.SaveChanges();

            return Result<bool>.Ok(target.IsCompleted, "Updated list status successfully", 200);
        }
        catch (ApiError e)
        {
            return Result<bool>.Fail(e);
        }
    }
}
