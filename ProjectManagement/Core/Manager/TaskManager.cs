using ProjectManagement.Models;

namespace ProjectManagement.Core.Manager
{
    public class TaskManager: Repository<Task, AppDbContext>
    {
        public TaskManager(AppDbContext context) : base(context)
        {

        }
    }
}
