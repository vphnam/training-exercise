using ShopAPI.Models;
using ShopAPI.ViewModels;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IUserAccountRepository
    {
        Task<UserAccount> CheckUserAccount(Credential cre);
    }
}