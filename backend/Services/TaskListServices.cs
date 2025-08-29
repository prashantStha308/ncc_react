using backend.Constants;
using backend.Data;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;
public class TaskListServices : ITaskListServices
{
    private readonly AppDbContext _context;
    public TaskListServices(AppDbContext context)
    {
        _context = context;
    }
    public ListResult CreateList(string Name, string Desc = "No Description Added")
    {
        try
        {
            TaskList NewList = new(Name, Desc);

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
            TaskList? targetList = _context.ListSet.Include(list => list.List).FirstOrDefault(list => list.ListId == listId);

            if (targetList == null) return ListResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskList", listId), 404);

            _context.TaskSet.RemoveRange(targetList.List);
            _context.ListSet.Remove(targetList);
            _context.SaveChanges();

            return ListResult.Ok("Deleted Task List successfully", 200);
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public ListResult UpdateListById(Guid listId, string? name, string? desc)
    {
        try
        {
            TaskList? target = _context.ListSet.FirstOrDefault(list => list.ListId == listId);

            if (target == null) return ListResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskList", listId), 404);

            if (name != null) target.Name = name;
            if (desc != null) target.Desc = desc;

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

            return Result<List<TaskList>>.Ok(taskLists, "Fetched all Lists Successfully");
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
            TaskList? target = _context.ListSet.FirstOrDefault(list => list.ListId == listId);

            if (target == null) return ListResult.Fail(ErrorMessages.ItemNotFoundWithId("TaskList", listId), 404);

            return ListResult.Ok(target, "Successfully Fetched List");
        }
        catch (ApiError e)
        {
            return ListResult.Fail(e);
        }
    }

    public Result<bool> CheckAndUpdateListStatusById(Guid ListId)
    {
        try
        {
            TaskList? targetList = _context.ListSet.FirstOrDefault(list => list.ListId == ListId);

            if (targetList == null) return Result<bool>.Fail("Target list not present in Database", 404);

            targetList.IsCompleted = targetList.List.TrueForAll(item => item.IsCompleted);
            _context.SaveChanges();

            return Result<bool>.Ok(targetList.IsCompleted, "Updated list status successfully", 200);
        }
        catch (ApiError e)
        {
            return Result<bool>.Fail(e);
        }
    }
}
