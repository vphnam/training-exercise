using System;
using System.Collections.Generic;

#nullable disable

namespace ShopAPI.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            PurchaseOrders = new HashSet<PurchaseOrder>();
        }

        public int SupplierNo { get; set; }
        public string SupplierName { get; set; }
        public string Email { get; set; }

        public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
