using ProjectManagement.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagement.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Budget { get; set; }
        public string Owner { get; set; }
        public Status Status { get; set; }

        //[JsonIgnore]
        //public IEnumerable<QuestionDto> Questions { get; set; }


    }
}
