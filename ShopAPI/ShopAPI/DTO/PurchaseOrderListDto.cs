using System;

namespace ShopAPI.DTO
{
    public class PurchaseOrderListDto
    {
        public int OrderNo { get; set; }
        public string StockSite1 { get; set; }
        public string SupplierName { get; set; }
        public string StockName { get; set; }
        public DateTime? OrderDate { get; set; }
        public bool? SentMail { get; set; }
        public bool? Status { get; set; }

    }
}
