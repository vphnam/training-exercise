using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Services;
using System.Collections.Generic;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderLineController : ControllerBase
    {
        private readonly IPurchaseOrderLineService _polService;
        public PurchaseOrderLineController(IPurchaseOrderLineService polService)
        {
            _polService = polService;
        }
        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<PurchaseOrderLine> polList = _polService.GetList();
            return new JsonResult(polList);
        }
        [HttpGet("purchaseorder/{no}")]
        public JsonResult GetByOrderNo(int no)
        {
            IEnumerable<PurchaseOrderLine> polList = _polService.GetAllRecordsOfPurchaseOrderByOrderNo(no);
            return new JsonResult(polList);
        }
        [HttpPost]
        public JsonResult Post(PurchaseOrderLine pol)
        {
            bool res = _polService.Create(pol);
            if(res == true)
                return new JsonResult("Inserted new purchase order line successfully!");
            else
                return new JsonResult("Something went wrong");
        }
        [HttpPut]
        public JsonResult Put(PurchaseOrderLine pol)
        {
            bool res = _polService.Update(pol);
            if (res == true)
                return new JsonResult("Updated purchase order line successfully!");
            else
                return new JsonResult("Something went wrong");
        }
        [HttpPut("update-list")]
        public JsonResult Put(List<PurchaseOrderLine> polList)
        {
            bool res = _polService.SetQtyAndPriceOfAllGivenPolToZero(polList);
            if (res == true)
                return new JsonResult("Updated purchase order line successfully!");
            else
                return new JsonResult("Something went wrong");
        }
        [HttpPost("del/")]
        public JsonResult Delete(DeletePolModel delPol)
        {
            int res = _polService.Delete(delPol);
            if (res == 1)
                return new JsonResult("Deleted purchase order line successfully!");
            else if(res == 2)
                return new JsonResult("Something went wrong");
            else
                return new JsonResult("Error: The PO must have at least one PO line!");
        }
    }
}