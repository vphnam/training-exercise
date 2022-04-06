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
    public class StockSiteRepository: IStockSiteRepository
    {
        private ExerciseDbContext db;
        public StockSiteRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }

        public async Task<IEnumerable<StockSite>> GetList()
        {
            return await db.StockSites.ToListAsync();
        }
    }
}
