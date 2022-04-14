using System;
using System.Collections.Generic;

#nullable disable

namespace ShopAPI.Models
{
    public partial class PurchaseOrder
    {
        public int OrderNo { get; set; }
        public int SupplierNo { get; set; }
        public string StockSite { get; set; }
        public string StockName { get; set; }
        public DateTime? OrderDate { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }
        public string County { get; set; }
        public string PostCode { get; set; }
        public bool? SentMail { get; set; }
        public bool? Status { get; set; }

        public virtual StockSite StockSiteNavigation { get; set; }
        public virtual Supplier SupplierNoNavigation { get; set; }
        public IEnumerable<PurchaseOrderLine> polList { get; set; }
    }
}
