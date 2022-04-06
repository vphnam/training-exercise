using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ShopAPI.Models;
using System.Threading.Tasks;
using System;
using ShopAPI.IServices;
using ShopAPI.ViewModels;

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
        public async Task<object> Get()
        {
             return await _poService.GetList();
        }
        [HttpGet("{no}")]
        public async Task<object> Get(int no)
        {
            return await _poService.GetRecord(no);
        }
        [HttpPost]
        public async Task<object> Post(PurchaseOrder po)
        {
            try
            {
                await _poService.Create(po);
                int id = po.OrderNo;
                return new ResultViewModel(ViewModels.StatusCode.OK, "Inserted new purchase order successfully!", po); 
            }
            catch(Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
        [HttpPut]
        public async Task<object> Put(PurchaseOrder po)
        {
            try
            {
                await _poService.Update(po);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Updated purchase order successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
        [HttpDelete("{no}")]
        public async Task<object> Delete(int no)
        {
            try
            {
                await _poService.Delete(no);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Deleted purchase order successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }

    }
}