using Microsoft.Extensions.Configuration;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public interface IPartRepository
    {
        IEnumerable<Part> GetList();
        IEnumerable<Part> GetListNotInPurchaseOrder(int no);
    }

    public class PartRepository : IPartRepository
    {
        private ExerciseDbContext db;
        public PartRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public IEnumerable<Part> GetList()
        {
            return db.Parts.ToList();
        }

        public IEnumerable<Part> GetListNotInPurchaseOrder(int no)
        {
            IEnumerable<Part> partList = db.Parts.Where(n => !db.PurchaseOrderLines.Any(b => b.OrderNo == no && b.PartNo == n.PartNo)).ToList();
            return partList;
        }
    }
}
