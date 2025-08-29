using backend.Models;

namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;

public interface ITaskListServices
{
    public ListResult CreateList(string Name, string Desc);
    public ListResult DeleteList(Guid listId);
    public ListResult UpdateListById(Guid listId, string? name, string? desc);
    public Result<List<TaskList>> GetAllLists();
    public ListResult GetListById(Guid listId);
    public Result<bool> CheckAndUpdateListStatusById(Guid ListId);
}
