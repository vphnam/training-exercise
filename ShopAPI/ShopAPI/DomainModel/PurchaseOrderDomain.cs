using System;

namespace ShopAPI.DomainModel
{
    public class PurchaseOrderDomain
    {
        public int? OrderNo { get; set; }
        public int SupplierNo { get; set; }
        public string StockSite { get; set; }
        public string StockName { get; set; }
        public DateTime OrderDate { get; set; }
        public string Note { get; set; }
        public string Address { get; set; }
        public string County { get; set; }
        public string PostCode { get; set; }
        public bool Status { get; set; }
        public bool SentMail { get; set; }
        protected PurchaseOrderDomain() { }
        internal PurchaseOrderDomain(int? OrderNo, int SupplierNo, string StockSite, string StockName, DateTime OrderDate, string Note, string Address, string County, string PostCode, bool Status, bool SentMail)
        {
            this.OrderNo = OrderNo;
            this.SupplierNo = SupplierNo;
            this.StockSite = StockSite;
            this.StockName = StockName;
            this.OrderDate = OrderDate;
            this.Note = Note;
            this.Address = Address;
            this.County = County;
            this.PostCode = PostCode;
            this.Status = Status;
            this.SentMail = SentMail;
        }
    }
}
