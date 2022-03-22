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
            var list = _poService.GetList();
            return list;
        }
        [HttpGet("{no}")]
        public JsonResult Get(int no)
        {
            var po = _poService.GetRecord(no);
            return po;
        }
        [HttpPost]
        public JsonResult Post(PurchaseOrder po)
        {
            var res = _poService.Create(po);
            return res;
        }
        [HttpPut]
        public JsonResult Put(PurchaseOrder po)
        {
            var res = _poService.Update(po);
            return res;
        }
        [HttpDelete]
        public JsonResult Delete(int no)
        {
            var res = _poService.Delete(no);
            return res;
        }
    }
}