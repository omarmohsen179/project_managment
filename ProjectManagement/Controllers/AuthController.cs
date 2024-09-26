using ProjectManagement.Core;
using ProjectManagement.DTOs;
using ProjectManagement.Models;
using ProjectManagement.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IUnitOfWork unitOfWork;
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private AppDbContext _context;
        public AuthController(AppDbContext context, IAuthService authService, IJwtService jwtService, IUnitOfWork unitOfWork)
        {
            _authService = authService;
            _jwtService = jwtService;
            _context = context;
            this.unitOfWork = unitOfWork;
        }
        [HttpGet("/")]
        public string test()
        {
            return "Test";
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesHelpers.Employee)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var response = await _authService.DeleteUserAsync(id);
            return response ? Ok(JsonConvert.SerializeObject(response)) : BadRequest(JsonConvert.SerializeObject(response));
        }
        [HttpGet]
        //[Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> users()
        {
            var response = _authService.FilterUsers(null);
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("{id}")]
        [Authorize(Roles = RolesHelpers.Manager)]
        public async Task<IActionResult> UserById(string id)
        {
            var response = (await _authService.userById(id));
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("roles")]
        //[Authorize(Roles = RolesHelpers.Users)]
        public async Task<IActionResult> roles()
        {
            var response = _authService.systemRoles();
            return Ok(JsonConvert.SerializeObject(response));
        }
        [HttpGet("data")]

        public IActionResult Data()
        {
            var userid = HttpContext.User.Claims.ElementAt(2).Value;
            return Ok(JsonConvert.SerializeObject(_authService.userData(userid)));
        }

        [HttpPost("EditUserRoles/{id}")]
        [Authorize(Roles = RolesHelpers.Employee)]
        public async Task<IActionResult> EditUserRoles(string id, IEnumerable<string> roles)
        {
            await _authService.UpdateUserRoleAsync(id, roles);
            return Ok();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _authService.RegisterAsync(model);
            return result.IsOk ? Ok(JsonConvert.SerializeObject(result.User)) : BadRequest(result.Message);
        }
        [HttpPost("update")]
        public async Task<IActionResult> updateAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await _authService.UpdateAsync(model);
            return result.IsOk ? Ok(JsonConvert.SerializeObject(result.User)) : BadRequest(result.Message);
        }
        [HttpPost("test-admin")]
        public async Task<IActionResult> TestAdminAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            model.Roles = _authService.systemRoles();

            var result = await _authService.RegisterAsync(model);

            if (!result.IsOk)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> GetTokenAsync([FromBody] TokenRequestModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _jwtService.GetTokenAsync(model);

                if (!result.IsAuthenticated)
                    return BadRequest(result.Message);
                return Ok(JsonConvert.SerializeObject(result));
            }
            catch (Exception ex)
            {

                return Ok(ex);
            }

        }
        //[HttpPost("forget-passworx")]
        //public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordFormForgetPasswordForm model)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);
        //    var result = await _authService.ForgetPassword(model, "");
        //    if (!result.IsOk)
        //        return BadRequest(result.Message);
        //    return Ok(result);
        //}

    }
}
