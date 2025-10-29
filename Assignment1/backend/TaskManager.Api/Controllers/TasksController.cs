using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using TaskManager.Api.Repositories;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repo;
        public TasksController(ITaskRepository repo) => _repo = repo;

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> Get() => Ok(_repo.GetAll());

        [HttpPost]
        public ActionResult<TaskItem> Create([FromBody] TaskItem input)
        {
            if (string.IsNullOrWhiteSpace(input.Description))
                return BadRequest("Description required.");

            var created = _repo.Add(new TaskItem { Description = input.Description });
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] TaskItem input)
        {
            var existing = _repo.Get(id);
            if (existing == null) return NotFound();

            existing.Description = input.Description ?? existing.Description;
            existing.IsCompleted = input.IsCompleted;
            _repo.Update(id, existing);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            if (!_repo.Delete(id)) return NotFound();
            return NoContent();
        }
    }
}
