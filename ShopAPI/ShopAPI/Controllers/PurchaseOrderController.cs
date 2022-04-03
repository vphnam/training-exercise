using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ShopAPI.Models;
using System.Threading.Tasks;
using System;
using ShopAPI.IServices;

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
        public async Task<IEnumerable<PurchaseOrder>> Get()
        {
             return await _poService.GetList();
        }
        [HttpGet("{no}")]
        public async Task<PurchaseOrder> Get(int no)
        {
            return await _poService.GetRecord(no);
        }
        [HttpPost]
        public async Task<string> Post(PurchaseOrder po)
        {
            try
            {
                await _poService.Create(po);
                return ("Inserted new purchase order successfully!");
            }
            catch(Exception ex)
            {
                return ("Error:: "+ ex.Message);
            }    
        }
        [HttpPut]
        public async Task<string> Put(PurchaseOrder po)
        {
            try
            {
                await _poService.Update(po);
                return ("Updated purchase order successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
        [HttpDelete("{no}")]
        public async Task<string> Delete(int no)
        {
            try
            {
                await _poService.Delete(no);
                return ("Deleted purchase order successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }

    }
}