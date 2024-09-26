using ProjectManagement.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ProjectManagement.Models
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasOne(b => b.Project).WithMany(b => b.Tasks).HasForeignKey(b => b.ProjectId);
        }
    }
    public class Task
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string AssignedTo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Priority Priority { get; set; }  // E.g., "High", "Medium", "Low"
        public Status Status { get; set; }  // E.g., "NotStarted", "InProgress", "Completed"

        public int ProjectId { get; set; }
        [JsonIgnore]
        public Project Project { get; set; }

    }
}
