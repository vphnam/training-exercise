using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IStockSiteRepository
    {
        Task<IEnumerable<StockSite>> GetList();
        Task<StockSite> GetByNo(string no);
    }
}
