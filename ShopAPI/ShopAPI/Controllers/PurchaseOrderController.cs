using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using System.Threading.Tasks;
using System;
using ShopAPI.IServices;
using ShopAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using ShopAPI.DTO;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "NormalUser, SuperUser")]
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
        public async Task<object> Post(AddPurchaseOrderDto addPoDto)
        {
            try
            {
                addPoDto = await _poService.Create(addPoDto.SupplierNo, addPoDto.StockSite, addPoDto.StockName, addPoDto.OrderDate,
            addPoDto.Note, addPoDto.Address, addPoDto.County, addPoDto.PostCode);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Inserted new purchase order successfully!", addPoDto); 
            }
            catch(Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex.Message);
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
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex.Message);
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
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex.Message);
            }
        }

    }
}