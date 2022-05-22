using ShopAPI.DomainModel;
using ShopAPI.IRepositories;
using System;
using System.Threading.Tasks;

namespace ShopAPI.Managers
{
    public class PurchaseOrderManager
    {
        private readonly IPurchaseOrderRepository _poRepo;
        public PurchaseOrderManager(IPurchaseOrderRepository poRepo)
        {
            _poRepo = poRepo;
        }
        public async Task<PurchaseOrderDomain> AddPurchaseOrderAsync(int SupplierNo, string StockSite, string StockName, DateTime OrderDate, 
            string Note, string Address, string County, string PostCode)
        {
            PurchaseOrderDomain po = new PurchaseOrderDomain(null,SupplierNo, StockSite, StockName, OrderDate, Note, Address, County, PostCode, true, false);
            return po;
        }
        public async Task<PurchaseOrderDomain> UpdatePurchaseOrderAsync(int OrderNo,int SupplierNo, string StockSite, string StockName, DateTime OrderDate,
            string Note, string Address, string County, string PostCode, bool Status, bool SentMail)
        {
            if ((await _poRepo.CheckExistByOrderNo(OrderNo)))
            {
                PurchaseOrderDomain po = new PurchaseOrderDomain(OrderNo, SupplierNo, StockSite, StockName, OrderDate, Note, Address, County, PostCode, Status, SentMail);
                return po;
            }
            else
                throw new Exception(string.Format("Purchase Order: {0} does not exist", OrderNo));
        }
    }
}
