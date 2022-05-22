using ShopAPI.Models;
using ShopAPI.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface ILoggerService
    {
        Task<UserAccount> GetIndentity(Credential cre);
    }
}
