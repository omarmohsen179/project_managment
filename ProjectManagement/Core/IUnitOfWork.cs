using ProjectManagement.Core.Manager;

namespace ProjectManagement.Core
{
    public interface IUnitOfWork
    {
        TaskManager TaskManager { get; }
        ProjectManager ProjectManager { get; }
    }
}
