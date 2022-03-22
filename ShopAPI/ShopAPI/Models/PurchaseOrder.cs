using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Models;

namespace ShopAPI.Models
{
    public class PurchaseOrder
    {
        [Key]
        public int OrderNo { get; set; }
        [ForeignKey("Supplier")]
        public int SupplierNo { get; set; }
        public string StockSite { get; set; }
        public string StockName { get; set; }
        public DateTime OrderDate { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }
        public string County { get; set; }
        public string PostCode { get; set; }
        public bool SentMail { get; set; }
        public bool Status { get; set; }    
        public List<PurchaseOrderLine> polList { get; set; }
    }
}
