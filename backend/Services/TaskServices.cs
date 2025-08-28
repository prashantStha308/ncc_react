using System;
using System.Runtime.CompilerServices;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;
using TaskResult = Result<TaskItem>;

public class TaskServices
{
    private List<TaskList> ListStorage = [];
    private readonly AppDbContext _context;

    public TaskServices(AppDbContext context)
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
        catch (Exception e)
        {
            return ListResult.Fail(e, 500);
        }
    }

    public TaskResult AddTaskInList(Guid listId, string name, string desc = "No Description Available")
    {
        try
        {
            TaskItem newTask = new(listId, name, desc);

            _context.TaskSet.Add(newTask);
            _context.SaveChanges();

            return TaskResult.Ok(newTask, "Task added successfully", 201);
        }
        catch (Exception e)
        {
            return TaskResult.Fail(e, 500);
        }
    }

    public TaskResult DeleteTaskById(Guid taskId)
    {
        try
        {
            TaskItem target = _context.TaskSet.First(item => item.TaskId == taskId);

            _context.TaskSet.Remove(target);
            _context.SaveChanges();

            return TaskResult.Ok("Deleted Task successfully", 200);
        }
        catch (Exception e)
        {
            return TaskResult.Fail(e, 500);
        }
    }

    public ListResult DeleteList(Guid listId)
    {
        try
        {
            TaskList targetList = _context.ListSet.Include(list => list.List).First(list => list.ListId == listId);

            _context.TaskSet.RemoveRange(targetList.List);
            _context.ListSet.Remove(targetList);
            _context.SaveChanges();

            return ListResult.Ok("Deleted Task List successfully", 200);
        }
        catch (Exception e)
        {
            return ListResult.Fail(e);
        }
    }

    public TaskResult UpdateTaskById(Guid taskId, string? name, string? desc)
    {
        try
        {
            TaskItem target = _context.TaskSet.First(task => task.TaskId == taskId);
         
            if (target == null) return TaskResult.Ok("Task Not Found", 404);
            if (name != null) target.TaskName = name;
            if (desc != null) target.Desc = desc;

            _context.SaveChanges();

            return TaskResult.Ok("Task Updated Successfully", 200);
        }
        catch (Exception e)
        {
            return TaskResult.Fail(e, 500);
        }
    }

    public ListResult UpdateListById(Guid ListId, string? name, string? desc)
    {
        try
        {
            TaskList target = _context.ListSet.First(list => list.ListId == ListId);

            if (name != null) target.Name = name;
            if (desc != null) target.Desc = desc;

            _context.SaveChanges();

            return ListResult.Ok("List Updated Successfully", 200);
        }
        catch (Exception e)
        {
            return ListResult.Fail(e);
        }
    }

    // Getters
    public Result<List<TaskList>> GetAllLists()
    {
        try
        {
            List<TaskList> taskLists = _context.ListSet.ToList();

            return Result<List<TaskList>>.Ok(taskLists, "Fetched all Lists Successfully");
        }
        catch (Exception e)
        {
            return Result<List<TaskList>>.Fail(e);
        }
    }

    public ListResult GetListById(Guid ListId)
    {
        try
        {
            TaskList target = _context.ListSet.First(list => list.ListId == ListId);

            if (target == null) return ListResult.Fail("Invalid Id", 404);

            return ListResult.Ok( target, "Successfully Fetched List");
        }
        catch (Exception e)
        {
            return ListResult.Fail(e);
        }
    }

    public TaskResult GetTaskById(Guid TaskId)
    {
        try
        {
            TaskItem target = _context.TaskSet.First(task => task.TaskId == TaskId);

            if (target == null) return TaskResult.Ok("Task not Found", 404);

            return TaskResult.Ok(target, "Successfully Fetched Task", 200);
        }
        catch (Exception e)
        {
            return TaskResult.Fail(e, 500);
        }
    }

    public Result<bool> CheckAndUpdateListStatus(int ListIndex)
    {
        try
        {
            ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(ListIndex, ListStorage.Count);

            TaskList targetList = ListStorage[ListIndex];
            int count = 0;

            for (int i = 0; i < targetList.List.Count; i++)
            {
                if (targetList.List[i].IsCompleted) count++;
            }

        bool wasCompleted = targetList.IsCompleted;
        targetList.IsCompleted = count == targetList.List.Count && targetList.List.Count > 0;
        
        return Result<bool>.Ok(targetList.IsCompleted, "Updated list status successfully");
        }
        catch (Exception e)
        {
            return Result<bool>.Fail(e);
        }
    }

    public Result<bool> ToggleTaskStatus(int ListIndex, int TaskIndex)
    {
        try
        {
            ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(ListIndex, ListStorage.Count);
            ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual(TaskIndex, ListStorage[ListIndex].List.Count);

            ListStorage[ListIndex].List[TaskIndex].IsCompleted = !ListStorage[ListIndex].List[TaskIndex].IsCompleted;

            return Result<bool>.Ok("Toggled task's Status");
        }
        catch (Exception e)
        {
            return Result<bool>.Fail(e);
        }
    }
}