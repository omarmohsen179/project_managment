
using ProjectManagement.Core;
using ProjectManagement.DTOs;
using ProjectManagement.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace ProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public ProjectController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        [HttpPost("pagination")]
        public IActionResult Get([FromQuery] PaginationRequest skipAndTake, [FromQuery] string projectName, [FromQuery] string id)
        {
            var res = this.unitOfWork.ProjectManager.Pagination(filter: e =>
            (id == null || e.Id.ToString() == id) &&
           (projectName == null || e.ProjectName.Contains(projectName))
           , pageIndex: skipAndTake.PageIndex, pageSize: skipAndTake.PageSize);
            return Ok(JsonConvert.SerializeObject(res));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            string JSONresult = JsonConvert.SerializeObject(this.unitOfWork.ProjectManager.Get(e=>e.Id ==id).First());
            return Ok(JSONresult);
        }
        [HttpGet("")]
        [Authorize(Roles = RolesHelpers.Employee + "," + RolesHelpers.Manager)]
        public IActionResult Getuser()
        {
            var objlist = this.unitOfWork.ProjectManager.GetAll();
            string JSONresult = JsonConvert.SerializeObject(objlist);
            return Ok(JSONresult);
        }
        [HttpPost]
        [Authorize(Roles = RolesHelpers.Manager)]
        public IActionResult InsertMember([FromBody] ProjectDto Temp)
        {

            try
            {
                var member = this.unitOfWork.ProjectManager.Add(_mapper.Map<Project>(Temp));
                string JSONresult = JsonConvert.SerializeObject(member);
                return Ok(JSONresult);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPut]
        [Authorize(Roles = RolesHelpers.Manager)]
        public IActionResult UpdateMember([FromBody] ProjectDto Temp)
        {

            try
            {
                var obj = this.unitOfWork.ProjectManager.Update(_mapper.Map<Project>(Temp));
                return obj ? Ok(JsonConvert.SerializeObject(Temp)): BadRequest(obj);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = RolesHelpers.Manager)]
        public IActionResult Delete(int id)
        {

            try
            {
                var obj = this.unitOfWork.ProjectManager.RemoveById(id);
                return obj ? Ok(200): BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
