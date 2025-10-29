using System;
using System.Collections.Generic;
using TaskManager.Api.Models;

namespace TaskManager.Api.Repositories
{
    public interface ITaskRepository
    {
        IEnumerable<TaskItem> GetAll();
        TaskItem? Get(Guid id);
        TaskItem Add(TaskItem item);
        bool Update(Guid id, TaskItem updated);
        bool Delete(Guid id);
    }
}
