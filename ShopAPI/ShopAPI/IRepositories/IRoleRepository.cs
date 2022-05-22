using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IRoleRepository
    {
        Task<Role> GetRole(int no);
    }
}
