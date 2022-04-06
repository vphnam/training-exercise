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
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supService;
        public SupplierController(ISupplierService supService)
        {
            _supService = supService;
        }
        [HttpGet]
        public async Task<object> Get()
        {
            return await _supService.GetList();
        }
    }
}
