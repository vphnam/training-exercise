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
    public class PoAndPolController : ControllerBase
    {
        private readonly IPoAndPolService _poAndPolService;
        public PoAndPolController(IPoAndPolService poAndPolService)
        {
            _poAndPolService = poAndPolService;
        }
        [HttpPost]
        public JsonResult SaveChanges(PurchaseOrder pol)
        {
            bool res =  _poAndPolService.SaveChanges(pol);
            if (res == true)
                return new JsonResult("Save changes successfully");
            else
                return new JsonResult("Something went wrong");
        }
    }
}