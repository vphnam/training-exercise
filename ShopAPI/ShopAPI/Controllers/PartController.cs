using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : ControllerBase
    {
        private readonly IPartService _partService;
        public PartController(IPartService partService)
        {
            _partService = partService;
        }
        [HttpGet]
        public JsonResult Get()
        {
            IEnumerable<Part> partList = _partService.GetList();
            return new JsonResult(partList);
        }
        [HttpGet("not-in-purchase-order/{no}")]
        public JsonResult GetPartListNotInPurchaseOrder(int no)
        {
            IEnumerable<Part> partList = _partService.GetListNotInPurchaseOrder(no);
            return new JsonResult(partList);
        }
    }
}
