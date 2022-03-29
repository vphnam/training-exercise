using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ShopAPI.Models;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using ShopAPI.Services;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _poService;
        public PurchaseOrderController(IPurchaseOrderService poService)
        {
            _poService = poService;
        }
        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<PurchaseOrder> poList = _poService.GetList();
            return new JsonResult(poList);
        }
        [HttpGet("{no}")]
        public JsonResult Get(int no)
        {
            PurchaseOrder po = _poService.GetRecord(no);
            return new JsonResult(po);
        }
        [HttpPost]
        public JsonResult Post(PurchaseOrder po)
        {
            bool res = _poService.Create(po);
            if (res == true)    
                return new JsonResult("Inserted new purchase order successfully!");
            else
                return new JsonResult("Something went wrong");
        }
        [HttpPut]
        public JsonResult Put(PurchaseOrder po)
        {
            bool res = _poService.Update(po);
            if (res == true)
                return new JsonResult("Updated purchase order successfully!");
            else
                return new JsonResult("Something went wrong");
        }
        [HttpDelete("{no}")]
        public JsonResult Delete(int no)
        {
            bool res = _poService.Delete(no);
            if (res == true)
                return new JsonResult("Deleted purchase order successfully!");
            else
                return new JsonResult("Something went wrong");
        }

    }
}