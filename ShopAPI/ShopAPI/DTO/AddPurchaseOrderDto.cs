using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.DTO
{
    public class AddPurchaseOrderDto
    {
        public int OrderNo { get; set; }
        public int SupplierNo { get; set; }
        public string StockSite { get; set; }
        public string StockName { get; set; }   
        public DateTime OrderDate { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }
        public string County { get; set; }
        public string PostCode { get; set; }
    }
}
