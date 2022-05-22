using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IPurchaseOrderLineService
    {
        Task<IEnumerable<PurchaseOrderLine>> GetList();
        Task Create(PurchaseOrderLine pol);
        Task<PurchaseOrderLine> GetRecord(int partNo, int orderNo);
        Task<IEnumerable<PurchaseOrderLine>> GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        Task SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList);
        Task Update(PurchaseOrderLine pol);
        Task Delete(DeletePolModel delPol);
    }
}
