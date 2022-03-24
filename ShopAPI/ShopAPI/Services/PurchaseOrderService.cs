using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public interface IPurchaseOrderService
    {
        JsonResult GetList();
        JsonResult Create(PurchaseOrder po);
        JsonResult GetRecord(int no);
        JsonResult Update(PurchaseOrder po);
        JsonResult Delete(int no);
    }
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        public PurchaseOrderService(IPurchaseOrderRepository poRepo)
        {
            _poRepo = poRepo;
        }
        public JsonResult GetList()
        {
            return _poRepo.GetList();
        }
        public JsonResult Create(PurchaseOrder po)
        {
            bool res = _poRepo.Create(po);
            if (res == true)
                return new JsonResult("Inserted new record to purchase order table successfully");
            else
                return new JsonResult("Something went wrong");
        }
        public JsonResult GetRecord(int no)
        {
            return _poRepo.GetRecord(no);
        }

        public JsonResult Update(PurchaseOrder po)
        {
            bool res = _poRepo.Update(po);
            if (res == true)
                return new JsonResult("Updated record in purchase order table successfully");
            else
                return new JsonResult("Something went wrong");
        }

        public JsonResult Delete(int no)
        {
            bool res = _poRepo.Delete(no);
            if (res == true)
                return new JsonResult("Deleted record in purchase order table successfully");
            else
                return new JsonResult("Something went wrong");
        }
    }
}
