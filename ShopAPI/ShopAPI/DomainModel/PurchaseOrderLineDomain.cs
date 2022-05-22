using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.DomainModel
{
    public class PurchaseOrderLineDomain
    {
        public int PartNo { get; set; }
        public int OrderNo { get; set; }
        public string PartDescription { get; set; }
        public string Manufacturer { get; set; }
        public DateTime OrderDate { get; set; }
        public int QuantityOrder { get; set; }
        public decimal BuyPrice { get; set; }
        public string Memo { get; set; }
        protected PurchaseOrderLineDomain() { }
        internal PurchaseOrderLineDomain(int PartNo, int OrderNo, string PartDescription, string Manufacturer, DateTime OrderDate, int QuantityOrder, decimal BuyPrice, string Memo)
        {
            this.PartNo = PartNo;
            this.OrderNo = OrderNo;
            this.PartDescription = PartDescription;
            this.Manufacturer = Manufacturer;
            this.OrderDate = OrderDate;
            this.QuantityOrder = QuantityOrder;
            this.BuyPrice = BuyPrice;
            this.Memo = Memo;
        }
    }
}
