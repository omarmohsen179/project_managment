using ProjectManagement.Models;
using System;

namespace ProjectManagement.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string AssignedTo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Priority Priority { get; set; } 
        public Status Status { get; set; } 
        public int ProjectId { get; set; }
        public ProjectDto Project { get; set; }

    }
}
