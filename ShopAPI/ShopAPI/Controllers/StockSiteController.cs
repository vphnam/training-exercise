using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockSiteController : ControllerBase
    {
        private readonly IStockSiteService _stService;
        public StockSiteController(IStockSiteService stService)
        {
            _stService = stService;
        }
        [HttpGet]
        public async Task<object> Get()
        {
            return await _stService.GetList();
        }
    }
}
