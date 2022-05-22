using ShopAPI.DTO;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IPurchaseOrderService
    {
        Task<List<PurchaseOrderListDto>> GetList();
        Task<AddPurchaseOrderDto> Create(int SupplierNo, string StockSite, string StockName, DateTime OrderDate,
            string Note, string Address, string County, string PostCode);
        Task<PurchaseOrder> GetRecord(int no);
        Task Update(PurchaseOrder po);
        Task Delete(int no);
    }
}
