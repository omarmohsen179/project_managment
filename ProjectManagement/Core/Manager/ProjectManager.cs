
using ProjectManagement.Models;

namespace ProjectManagement.Core.Manager
{
    public class ProjectManager : Repository<Project, AppDbContext>
    {
        public ProjectManager(AppDbContext context) : base(context)
        {

        }
    }
}
