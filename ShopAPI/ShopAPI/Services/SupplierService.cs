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

        public async Task<Supplier> GetByNo(int no)
        {
            return await _supRepo.GetByNo(no);
        }

        public async Task<IEnumerable<Supplier>> GetList()
        {
            return await _supRepo.GetList();
        }
        public async Task Create(Supplier sp)
        {
            await _supRepo.Create(sp);
        }
    }
}
