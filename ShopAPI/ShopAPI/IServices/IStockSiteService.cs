using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IStockSiteService
    {
        Task<IEnumerable<StockSite>> GetList();
        Task<StockSite> GetByNo(string no);
    }
}
