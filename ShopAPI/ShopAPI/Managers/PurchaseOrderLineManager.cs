using ShopAPI.DomainModel;
using ShopAPI.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Managers
{
    public class PurchaseOrderLineManager
    {
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PurchaseOrderLineManager(IPurchaseOrderLineRepository polRepo)
        {
            _polRepo = polRepo;
        }
        public async Task<PurchaseOrderLineDomain> UpdatePurchaseOrderLineAsync(int PartNo,int OrderNo, string PartDescription, string Manufacturer, DateTime OrderDate, int QuantityOrder, decimal BuyPrice, string Memo)
        {
            if ((await _polRepo.CheckExistByPartAndOrderNo(PartNo, OrderNo)))
            {
                PurchaseOrderLineDomain po = new PurchaseOrderLineDomain(PartNo, OrderNo, PartDescription, Manufacturer, OrderDate, QuantityOrder, BuyPrice, Memo);
                return po;
            }
            else
                throw new Exception(string.Format("Purchase order line: {0} does not exist on purchase order {1}", PartNo, OrderNo));
        }
        public async Task<PurchaseOrderLineDomain> DeletePurchaseOrderLineAsync(int partNo, int orderNo, string partDescription, string manufacturer, DateTime orderDate, int quantityOrder, decimal buyPrice, string memo)
        {
            if (!(await _polRepo.CheckExistByPartAndOrderNo(partNo, orderNo)))
            {
                throw new Exception(string.Format("Purchase order line: {0} does not exist on purchase order {1}", partNo, orderNo));
            }
            if((await _polRepo.CountLineOfPurchaseOrder(orderNo) <= 1))
            {
                throw new Exception(string.Format("Purchase order: {0} must have at least 1 line", orderNo));
            }
            PurchaseOrderLineDomain po = new PurchaseOrderLineDomain(partNo, orderNo, partDescription, manufacturer, orderDate, quantityOrder, buyPrice, memo);
            return po;
        }
    }
}
