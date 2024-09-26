using ProjectManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagement.Models
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasMany(b => b.Tasks)
                .WithOne(b => b.Project)
                .HasForeignKey(b => b.ProjectId);
        }
    }
    public class Project
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Budget { get; set; }
        public string Owner { get; set; }
        public Status Status { get; set; }

        [JsonIgnore]
        public IEnumerable<Task> Tasks { get; set; }


    }
}
