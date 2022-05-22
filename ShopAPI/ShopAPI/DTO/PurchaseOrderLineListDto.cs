using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.DTO
{
    public class PurchaseOrderLineListDto
    {
        public int PartNo { get; set; }
        public int OrderNo { get; set; }
        public string PartDescription { get; set; }
        public string Manufacturer { get; set; }
        public DateTime OrderDate { get; set; }
        public int QuantityOrder { get; set; }
        public decimal BuyPrice { get; set; }
        public string Memo { get; set; }
        public decimal Amount { get { return this.BuyPrice * this.QuantityOrder; } }
    }
}
