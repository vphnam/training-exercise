using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ExerciseDbContext db;
        public RoleRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public async Task<Role> GetRole(int no)
        {
            return await db.Roles.FindAsync(no);
        }
    }
}
