using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public interface IPurchaseOrderLineService
    {
        JsonResult GetList();
        JsonResult Create(PurchaseOrderLine pol);
        JsonResult GetRecord(int no);
        JsonResult GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        JsonResult Update(PurchaseOrderLine pol);
        JsonResult Delete(int no);
    }

    public class PurchaseOrderLineService : IPurchaseOrderLineService
    {
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PurchaseOrderLineService(IPurchaseOrderLineRepository polRepo)
        {
            _polRepo = polRepo;
        }
        public JsonResult Create(PurchaseOrderLine pol)
        {
            bool res = _polRepo.Create(pol);
            if (res == true)
                return new JsonResult("Inserted new record to purchase order line table successfully");
            return new JsonResult("Something went wrong");
        }

        public JsonResult Delete(int no)
        {
            bool res = _polRepo.Delete(no);
            if (res == true)
                return new JsonResult("Deleted record in purchase order line table successfully");
            return new JsonResult("Something went wrong");
        }

        public JsonResult GetList()
        {
            return _polRepo.GetList();
        }

        public JsonResult GetRecord(int no)
        {
            return _polRepo.GetRecord(no);
        }
        public JsonResult GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            return _polRepo.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        public JsonResult Update(PurchaseOrderLine pol)
        {
            bool res = _polRepo.Update(pol);
            if (res == true)
                return new JsonResult("Updated record in purchase order line table successfully");
            return new JsonResult("Something went wrong");
        }
    }
}
