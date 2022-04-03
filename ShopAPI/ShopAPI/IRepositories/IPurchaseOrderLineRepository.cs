using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IRepositories
{
    public interface IPurchaseOrderLineRepository
    {
        Task<IEnumerable<PurchaseOrderLine>> GetList();
        Task<PurchaseOrderLine> GetRecord(int no);
        Task<IEnumerable<PurchaseOrderLine>> GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        Task SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList);
        Task Create(PurchaseOrderLine pol);
        Task Update(PurchaseOrderLine pol);
        Task UpdateList(IEnumerable<PurchaseOrderLine> polList);
        Task Delete(DeletePolModel delPol);
    }
}
