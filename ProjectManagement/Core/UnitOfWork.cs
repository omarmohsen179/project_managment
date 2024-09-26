using ProjectManagement.Core.Manager;
using ProjectManagement.Models;

namespace ProjectManagement.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;

        public UnitOfWork(AppDbContext context)
        {
            this.context = context;
        }
      
        private TaskManager questionManager;

        public TaskManager TaskManager
        {

            get
            {
                if (questionManager == null)
                {
                    questionManager = new TaskManager(context);
                }
                return questionManager;
            }

        }



        private ProjectManager categoryManager;

        public ProjectManager ProjectManager
        {

            get
            {
                if (categoryManager == null)
                {
                    categoryManager = new ProjectManager(context);
                }
                return categoryManager;
            }

        }

    }
}
