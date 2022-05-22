using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public class StockSiteService: IStockSiteService
    {
        private readonly IStockSiteRepository _stRepo;
        public StockSiteService(IStockSiteRepository stRepo)
        {
            _stRepo = stRepo;
        }

        public async Task<StockSite> GetByNo(string no)
        {
            return await _stRepo.GetByNo(no);
        }

        public async Task<IEnumerable<StockSite>> GetList()
        {
            return await _stRepo.GetList();
        }
    }
}
