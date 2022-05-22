using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IPartRepository
    {
        Task<IEnumerable<Part>> GetList();
        Task<IEnumerable<Part>> GetListNotInPurchaseOrder(int no);
    }
}
