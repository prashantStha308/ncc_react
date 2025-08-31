using System;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Helpers;

public class RepositoryHelper
{
    private readonly AppDbContext _context;

    public RepositoryHelper(AppDbContext context)
    {
        _context = context;
    }

    public List<T> GetAllData<T>(Guid userId, bool includeTasks = false) where T : class
    {
        IQueryable<T> query = _context.Set<T>();

        if (includeTasks && typeof(T) == typeof(TaskList))
        {
            query = query.Cast<TaskList>()
                        .Include(t => t.List)
                        .Where(t => t.OwnerId == userId)
                        .Cast<T>();
        }

        return query.ToList();
    }

    public T GetDataById<T>(Guid id, bool includeTasks = false) where T : class
    {
        if (includeTasks && typeof(T) == typeof(TaskList))
        {
            return _context.Set<TaskList>()
                        .Include(t => t.List)
                        .FirstOrDefault(t => t.ListId == id) as T
                ?? throw new ApiError($"{typeof(T).Name} not found", 404);
        }

        T? target = _context.Set<T>().Find(id);
        if (target == null)
            throw new ApiError($"{typeof(T).Name} not found", 404);

        return target;
    }

    public void DeleteDataByIdAndSave<T>(Guid id) where T : class
    {
        T? target = _context.Set<T>().Find(id);

        if (target == null) throw new ApiError($"{typeof(T).Name} not found", 404);

        _context.Set<T>().Remove(target);
        _context.SaveChanges();
    }

    public void AddDataToContextAndSave<T>(T data) where T : class
    {
        _context.Set<T>().Add(data);
        _context.SaveChanges();
    }
}
