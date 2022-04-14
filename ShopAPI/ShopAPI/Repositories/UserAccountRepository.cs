using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public class UserAccountRepository : IUserAccountRepository
    {
        private readonly ExerciseDbContext db;
        public UserAccountRepository(IConfiguration config)
        {
            db = new ExerciseDbContext(config);
        }
        public async Task<UserAccount> CheckUserAccount(Credential cre)
        {
            UserAccount user = await db.UserAccounts.Where(n => n.UserName == cre.UserName && n.PassWord == cre.PassWord).FirstOrDefaultAsync();
            if (user != null)
            {
                return user;
            }
            else
                return null;
        }
    }
}
