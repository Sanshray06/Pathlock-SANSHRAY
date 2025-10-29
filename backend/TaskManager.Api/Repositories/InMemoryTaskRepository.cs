using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using TaskManager.Api.Models;

namespace TaskManager.Api.Repositories
{
    public class InMemoryTaskRepository : ITaskRepository
    {
        private readonly ConcurrentDictionary<Guid, TaskItem> _store = new();

        public IEnumerable<TaskItem> GetAll() => _store.Values;

        public TaskItem? Get(Guid id) => _store.TryGetValue(id, out var item) ? item : null;

        public TaskItem Add(TaskItem item)
        {
            _store[item.Id] = item;
            return item;
        }

        public bool Update(Guid id, TaskItem updated)
        {
            if (!_store.ContainsKey(id)) return false;
            _store[id] = updated;
            return true;
        }

        public bool Delete(Guid id) => _store.TryRemove(id, out _);
    }
}
