using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Services;

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
            return _polService.GetList();
        }
        [HttpGet("purchaseorder/{no}")]
        public JsonResult GetByOrderNo(int no)
        {
            return _polService.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        [HttpPost]
        public JsonResult Post(PurchaseOrderLine pol)
        {
            return _polService.Create(pol);
        }
        [HttpPut]
        public JsonResult Put(PurchaseOrderLine pol)
        {
            return _polService.Update(pol);
        }
        [HttpDelete("{no}")]
        public JsonResult Delete(int no)
        {
            return _polService.Delete(no);
        }
    }
}
