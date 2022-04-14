using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderLineController : ControllerBase
    {
        private readonly IPurchaseOrderLineService _polService;
        public PurchaseOrderLineController(IPurchaseOrderLineService polService)
        {
            _polService = polService;
        }
        [HttpGet]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> Get()
        {
            return await _polService.GetList();
        }
        [HttpGet("purchaseorder/{no}")]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> GetByOrderNo(int no)
        {
            return await _polService.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        [HttpPost]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> Post(PurchaseOrderLine pol)
        {
            try
            {
                await _polService.Create(pol);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Inserted new purchase order line successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
        [HttpPut]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> Put(PurchaseOrderLine pol)
        {
            try
            {
                await _polService.Update(pol);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Updated purchase order line successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
        [HttpPut("update-list")]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> Put(List<PurchaseOrderLine> polList)
        {
            try
            {
                await _polService.SetQtyAndPriceOfAllGivenPolToZero(polList);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Updated purchase order lines successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
        [HttpPost("del/")]
        [Authorize(Roles = "NormalUser, SuperUser")]
        public async Task<object> Delete(DeletePolModel delPol)
        {
            try
            {
                await _polService.Delete(delPol);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Deleted purchase order line successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
    }
}