using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IPurchaseOrderRepository
    {
        Task<IEnumerable<PurchaseOrder>> GetList();
        Task<PurchaseOrder> GetRecord(int no);
        Task Create(PurchaseOrder po);
        Task Update(PurchaseOrder po);
        Task Delete(int no);

    }
}
