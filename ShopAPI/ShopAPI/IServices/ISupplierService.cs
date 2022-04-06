using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface ISupplierService
    {
        Task<IEnumerable<Supplier>> GetList();
    }
}
