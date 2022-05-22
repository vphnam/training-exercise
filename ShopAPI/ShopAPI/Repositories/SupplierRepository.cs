using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private ExerciseDbContext db;
        public SupplierRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }

        public async Task<Supplier> GetByNo(int no)
        {
            return await db.Suppliers.FindAsync(no);
        }

        public async Task<IEnumerable<Supplier>> GetList()
        {
            return await db.Suppliers.ToListAsync();
        }
        public async Task Create(Supplier sp)
        {
            db.Suppliers.Add(sp);
            await db.SaveChangesAsync();
        }
    }
}
