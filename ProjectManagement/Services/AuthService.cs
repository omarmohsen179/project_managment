using ProjectManagement.DTOs;
using ProjectManagement.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ProjectManagement.Core;

namespace ProjectManagement.Services
{
    public class ChangePasswordForm
    {
        public string Id { get; set; }
        public string Password { get; set; }
    }
    public class UserAuth
    {
        //public List<Client> UserClients { get; set; }
        public List<string> Roles { get; set; }
    }
    public interface IAuthService
    {
        System.Threading.Tasks.Task UpdateUserRoleAsync(string id, IEnumerable<string> new_role);
        Task<Valid> RegisterAsync(RegisterModel model);
        IEnumerable<ApplicationUser> FilterUsers(Expression<Func<ApplicationUser, bool>> filter = null, string includeProperties = "");
        Task<Valid> UpdateAsync(RegisterModel model);
        //Task<Valid> ConfirmEmail(emailconfirm model);
        //Task<Valid> ForgetPassword(ForgetPasswordFormForgetPasswordForm model, string URL);
        Task<Valid> CheckUserType(string username);
        List<string> systemRoles();
        object userData(string userId);
        UserAuth userAuthrizations(string userId);
        Task<bool> DeleteUserAsync(string Id);
        Task<object> userById(string Id);
    }


    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IJwtService _jwtService;
        //private readonly IMailService mailService;
        private readonly IUnitOfWork unitOfWork;
        private readonly AppDbContext _context;
        public AuthService(IUnitOfWork _unitOfWork, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJwtService jwtService, AppDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
            //mailService = _mailSettings;
            unitOfWork = _unitOfWork;
            this._context = dbContext;        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public async Task<object> retriveUser(string username)
        {

            var res = FilterUsers(e => e.UserName == username);
            var roles = (await _userManager.GetRolesAsync(res.First())).ToList();
            var usertarget = res.Select(e => new
            {
                e.Id,
                Username = e.UserName,
                Password = e.PasswordStored,
                Roles = roles
            }
            ).First();
            return usertarget;
        }
        public async Task<Valid> RegisterAsync(RegisterModel model)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                if (await _userManager.FindByNameAsync(model.Username) is not null)
                return new Valid
                {
                    IsOk = false,
                    Message = "Email is already registered!"
                };
            var user = new ApplicationUser()
            {
                Email = model.Username,
                UserName = model.Username,
                PasswordStored = model.Password,
            };



            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Aggregate(string.Empty, (current, error) => current + $"{error.Description}\n");
                return new Valid
                {
                    IsOk = false,
                    Message = errors
                };
            }

            await _userManager.AddToRolesAsync(user, model.Roles);
                await transaction.CommitAsync();
                _context.SaveChanges();
            return new Valid()
            {
                IsOk = true,
                User = retriveUser(model.Username).Result,
                Message = "success"
            };
        }   catch (Exception)
        {
                // Rollback in case of any errors
                await transaction.RollbackAsync();
                throw;
            }
        }
        public async Task<Valid> UpdateAsync(RegisterModel model)
        {

            if (FilterUsers(e => e.UserName == model.Username && e.Id != model.Id).ToList().Count() > 0)
                return new Valid
                {
                    IsOk = false,
                    Message = "Username is taken"
                };
            var olduser = FilterUsers(e => e.Id == model.Id).ToList().First();
            olduser.Email = model.Username;
            olduser.UserName = model.Username;
            olduser.PasswordStored = model.Password;

            var result = await _userManager.UpdateAsync(olduser);

            if (olduser.PasswordStored != model.Password)
            {
                ResetUserPassword(new ChangePasswordForm() { Id = model.Id, Password = model.Password });
            }


            if (!result.Succeeded)
            {
                var errors = result.Errors.Aggregate(string.Empty, (current, error) => current + $"{error.Description}\n");

                return new Valid
                {
                    IsOk = false,
                    Message = errors
                };
            }
            await UpdateUserRoleAsync(model.Id, model.Roles);
            return new()
            {
                IsOk = true,
                User = retriveUser(model.Username).Result,
                Message = "success"
            };
        }
    
        public async System.Threading.Tasks.Task UpdateUserRoleAsync(string id, IEnumerable<string> new_role)
        {
            var userx = FilterUsers(e => e.Id == id);
            var result = await _userManager.RemoveFromRolesAsync(userx.ElementAt(0), await _userManager.GetRolesAsync(userx.ElementAt(0)));
            if (!result.Succeeded)
                throw new Exception("problem in user Roles Change");

            var addroles = await _userManager.AddToRolesAsync(userx.ElementAt(0), new_role);
            if (!addroles.Succeeded)
                throw new Exception("problem in user Roles Change");

        }

        public async Task<Valid> CheckUserType(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            List<string> roles = (List<string>)await _userManager.GetRolesAsync(user);
            return new Valid
            {
                IsOk = true,
                Message = roles.ElementAt(0).ToString()
            };



        }

        public void ResetUserPassword(ChangePasswordForm usermodel)
        {
            try
            {
                var user = FilterUsers(e => e.Id == usermodel.Id).ToList().First();

                if (user == null)
                {
                    throw new Exception("wrong user");
                }
                var token = _userManager.GeneratePasswordResetTokenAsync(user).Result;
                var result = _userManager.ResetPasswordAsync(user, token, usermodel.Password).Result;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public IEnumerable<ApplicationUser> FilterUsers(Expression<Func<ApplicationUser, bool>> filter = null, string includeProperties = "")
        {
            if (filter != null)
            {
                var users = _userManager.Users.Where(filter);

                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    users = users.Include(includeProperty);
                }
                return users;
            }
            else
            {
                return _userManager.Users.ToList();
            }

        }
        public async Task<bool> DeleteUserAsync(string Id)
        {
            var user = FilterUsers(e => e.Id == Id);
            //this.unitOfWork.UserClientsManager.RemoveFilter(e => e.ApplicationUserId == Id);
            var result = await _userManager.DeleteAsync(user.ElementAt(0));
            return result.Succeeded;
        }

        public List<string> systemRoles()
        {
            var x = _roleManager.Roles.Select(e => e.Name).ToList();
            return x;
        }

        public async Task<object> userById(string Id)
        {
            var user = FilterUsers(e => e.Id == Id);
            var roles = (await _userManager.GetRolesAsync(user.First())).ToList();
            var usertarget = user.Select(e => new
            {
                e.Id,
                Username = e.UserName,
                Password = e.PasswordStored,
                Roles = roles,
            }).First();
            return usertarget;
        }

        public object userData(string userId)
        {
            List<ApplicationUser> userstores = FilterUsers(e => e.Id == userId).ToList();
            var roles = (_userManager.GetRolesAsync(userstores.First())).Result.ToList();
            if (userstores.Count == 0)
            {
                throw new UnauthorizedAccessException();
            }
            return new
            {
                Roles =     roles,
                Username = userstores.First().UserName,
            };
        }

        public UserAuth userAuthrizations(string userId)
        {
            List<ApplicationUser> userstores = FilterUsers(e => e.Id == userId, includeProperties: "UserClients").ToList();
            var roles = (_userManager.GetRolesAsync(userstores.First())).Result.ToList();
            if (userstores.Count == 0)
            {
                throw new UnauthorizedAccessException();
            }
            return new UserAuth()
            {
                Roles = roles,
            };
        }
    }
}
