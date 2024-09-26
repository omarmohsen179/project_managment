using ProjectManagement.Core;
using ProjectManagement.DTOs;
using ProjectManagement.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

namespace ProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public TaskController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this._mapper = mapper;
        }
        [HttpPost("pagination")]
        public IActionResult Get([FromQuery] PaginationRequest skipAndTake, [FromQuery] string taskName, [FromQuery] string id)
        {
            var res = this.unitOfWork.TaskManager.Pagination(filter: e =>
            (id == null || e.Id.ToString() == id) &&
           (taskName == null || e.TaskName.Contains(taskName))
           , pageIndex: skipAndTake.PageIndex, pageSize: skipAndTake.PageSize);
            return Ok(JsonConvert.SerializeObject(res));
        }


        [HttpGet]
        [Authorize(Roles = RolesHelpers.Manager + "," + RolesHelpers.Employee)]
        public IActionResult Get()
        {
            var objlist = this.unitOfWork.TaskManager.Get();
            string JSONresult = JsonConvert.SerializeObject(objlist);
            return Ok(JSONresult);
        }

        [HttpPost]
        [Authorize(Roles = RolesHelpers.Manager + "," + RolesHelpers.Employee)]
        public IActionResult Insert([FromBody] TaskDto Temp)
        {

            try
            {
                var Object = this.unitOfWork.TaskManager.Add(_mapper.Map<Task>(Temp));
                return Object.Id > 0 ? Ok(JsonConvert.SerializeObject(Object)) : BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpPut]
        [Authorize(Roles = RolesHelpers.Manager + "," + RolesHelpers.Employee)]
        public IActionResult Update([FromBody] TaskDto Temp)
        {
            try
            {
                var task = _mapper.Map<Task>(Temp);
                var Object = this.unitOfWork.TaskManager.Update(task);
                var target = JsonConvert.SerializeObject(Temp);
                return Object ? Ok(target) : BadRequest();
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
                var Object = this.unitOfWork.TaskManager.RemoveById(id);
                return Object ?  Ok(200) : BadRequest();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}