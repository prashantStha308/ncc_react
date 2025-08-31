using backend.DTO;
using backend.Models;

namespace backend.Services.Interfaces;

// Setting Aliases
using ListResult = Result<TaskList>;

public interface ITaskListServices
{
    public ListResult CreateList(Guid? userId, TaskListRequest request);
    public ListResult DeleteList(Guid listId);
    public ListResult UpdateListById(Guid listId, TaskListRequest request);
    public Result<List<TaskList>> GetAllLists(Guid ownerId);
    public ListResult GetListById(Guid listId);
    public ListResult ToggleListStatusById(Guid ListId);
}
