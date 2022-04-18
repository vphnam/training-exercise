using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoggerService _logger;
        private readonly IConfiguration _config;
        public LoginController(ILoggerService logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }
        [HttpPost]
        public async Task<ResultViewModel> GetAuthenticationContext(Credential cre)
        {
            UserAccount user = await _logger.GetIndentity(cre);
            if(user != null)
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var crendentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserNo.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.RoleNoNavigation.RoleName)
                };

                var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(20), signingCredentials: crendentials);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                //var identity = new ClaimsIdentityg(claims, "CookieAuthentication");
                //ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
                UserViewModel userView = new UserViewModel();
                userView.Id = user.UserNo;
                userView.UserName = user.UserName;
                userView.PassWord = user.PassWord;
                userView.RoleNo = user.RoleNoNavigation.RoleNo;
                userView.Role= user.RoleNoNavigation.RoleName;
                userView.Token = tokenString;

                return new ResultViewModel(ViewModels.StatusCode.OK, "Login successfully!", userView);
            }
            else
                return new ResultViewModel(ViewModels.StatusCode.Error, "Error!", null);
        }
    }
}
