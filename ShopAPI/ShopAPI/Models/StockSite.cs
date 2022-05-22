using System;
using System.Collections.Generic;

#nullable disable

namespace ShopAPI.Models
{
    public partial class StockSite
    {
        public StockSite()
        {
            PurchaseOrders = new HashSet<PurchaseOrder>();
        }

        public string StockSite1 { get; set; }
        public string Email { get; set; }

        public virtual ICollection<PurchaseOrder> PurchaseOrders { get { return null; } set {; } }
    }
}
