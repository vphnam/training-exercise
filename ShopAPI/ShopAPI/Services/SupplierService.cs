using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supRepo;
        public SupplierService(ISupplierRepository supRepo)
        {
            _supRepo = supRepo;

        }
        public async Task<IEnumerable<Supplier>> GetList()
        {
            return await _supRepo.GetList();
        }
    }
}
