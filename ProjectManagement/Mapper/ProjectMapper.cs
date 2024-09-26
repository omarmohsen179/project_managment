using Nancy.Json;
using AutoMapper;
using System.Collections.Generic;
using ProjectManagement.DTOs;
using ProjectManagement.Models;

namespace ProjectManagement.Mapper
{
    public class ProjectMapper : Profile
    {
        public ProjectMapper()
        {

            CreateMap<Project,ProjectDto>().ReverseMap();
            CreateMap<Task,TaskDto>().ForMember(des => des.Project,
                op => op.MapFrom(src => src.Project)).ReverseMap();
        }
    }
}
