using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{

    public class PartRepository : IPartRepository
    {
        private ExerciseDbContext db;
        public PartRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public async Task<IEnumerable<Part>> GetList()
        {
            return await db.Parts.ToListAsync();
        }

        public async Task<IEnumerable<Part>> GetListNotInPurchaseOrder(int no)
        {
            IEnumerable<Part> partList = await db.Parts.Where(n => !db.PurchaseOrderLines.Any(b => b.OrderNo == no && b.PartNo == n.PartNo)).ToListAsync();
            return partList;
        }
    }
}
