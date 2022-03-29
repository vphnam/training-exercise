using System;
using System.Collections.Generic;

#nullable disable

namespace ShopAPI.Models
{
    public partial class Part
    {
        public Part()
        {
            PurchaseOrderLines = new HashSet<PurchaseOrderLine>();
        }

        public int PartNo { get; set; }
        public string PartName { get; set; }

        public virtual ICollection<PurchaseOrderLine> PurchaseOrderLines { get; set; }
    }
}
