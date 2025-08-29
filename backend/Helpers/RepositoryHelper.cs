using System;
using backend.Data;

namespace backend.Helpers;

public class RepositoryHelper
{
    private readonly AppDbContext _context;

    public RepositoryHelper(AppDbContext context)
    {
        _context = context;
    }

        public List<T> GetAllData<T>() where T : class
    {
        List<T> datas = _context.Set<T>().ToList();
        return datas;
    }

    public T GetDataById<T>(Guid id) where T : class
    {
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
