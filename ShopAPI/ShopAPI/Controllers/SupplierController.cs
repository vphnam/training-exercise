using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
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
        [Authorize(Roles = "SuperUser")]
        public async Task<object> Get()
        {
            return await _supService.GetList();
        }
        [HttpGet("{no}")]
        [Authorize(Roles = "SuperUser")]
        public async Task<object>Get(int no)
        {
            return await _supService.GetByNo(no);
        }
        [HttpPost]
        [Authorize(Roles ="SuperUser")]
        public async Task<object>Create(Supplier sp)
        {
            try
            {
                await _supService.Create(sp);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Inserted new supplier successfully!", sp);
            }
            catch(Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.OK, "Something went wrong!", ex.Message);
            }
        }
    }
}
