using backend.DTO;
using backend.Models;

namespace backend.Services;

// Setting Aliases
using ListResult = Result<TaskList>;

public interface ITaskListServices
{
    public ListResult CreateList(TaskListRequest request);
    public ListResult DeleteList(Guid listId);
    public ListResult UpdateListById(Guid listId, TaskListRequest request);
    public Result<List<TaskList>> GetAllLists();
    public ListResult GetListById(Guid listId);
    public Result<bool> CheckAndUpdateListStatusById(Guid ListId);
}
