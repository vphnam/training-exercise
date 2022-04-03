using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IPurchaseOrderService
    {
        Task<IEnumerable<PurchaseOrder>> GetList();
        Task Create(PurchaseOrder po);
        Task<PurchaseOrder> GetRecord(int no);
        Task Update(PurchaseOrder po);
        Task Delete(int no);
    }
}
