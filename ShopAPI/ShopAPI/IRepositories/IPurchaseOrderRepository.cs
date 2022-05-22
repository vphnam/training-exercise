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
        Task<bool> CheckExistByOrderNo(int orderNo);
        Task<PurchaseOrder> Create(PurchaseOrder po);
        Task<PurchaseOrder> Update(PurchaseOrder po);
        Task Delete(int no);

    }
}
