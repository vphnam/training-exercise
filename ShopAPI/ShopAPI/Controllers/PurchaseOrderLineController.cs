using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
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
        public async Task<IEnumerable<PurchaseOrderLine>> Get()
        {
            return await _polService.GetList();
        }
        [HttpGet("purchaseorder/{no}")]
        public async Task<IEnumerable<PurchaseOrderLine>> GetByOrderNo(int no)
        {
            return await _polService.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        [HttpPost]
        public async Task<string> Post(PurchaseOrderLine pol)
        {
            try
            {
                await _polService.Create(pol);
                return ("Inserted new purchase order line successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
        [HttpPut]
        public async Task<string> Put(PurchaseOrderLine pol)
        {
            try
            {
                await _polService.Update(pol);
                return ("Updated purchase order line successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
        [HttpPut("update-list")]
        public async Task<string> Put(List<PurchaseOrderLine> polList)
        {
            try
            {
                await _polService.SetQtyAndPriceOfAllGivenPolToZero(polList);
                return ("Updated purchase order lines successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
        [HttpPost("del/")]
        public async Task<string> Delete(DeletePolModel delPol)
        {
            try
            {
                await _polService.Delete(delPol);
                return ("Deleted purchase order line successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
    }
}