
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly IUserAccountRepository _userRepo;
        private readonly IRoleRepository _roleRepo;
        private readonly IConfiguration _config;
        public LoggerService(IUserAccountRepository userRepo, IRoleRepository roleRepo, IConfiguration config)
        {
            _userRepo = userRepo;
            _roleRepo = roleRepo;
            _config = config;
        }
        public async Task<UserAccount> GetIndentity(Credential cre)
        {
            UserAccount user = await _userRepo.CheckUserAccount(cre);
            if(user != null)
            {
                user.RoleNoNavigation = await _roleRepo.GetRole(user.RoleNo);

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var crendentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
