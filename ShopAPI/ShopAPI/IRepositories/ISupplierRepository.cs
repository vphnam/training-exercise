using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<Supplier>> GetList();
        Task<Supplier> GetByNo(int no);
    }
}
