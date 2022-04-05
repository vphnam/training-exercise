using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
using System.Collections.Generic;
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
        public async Task<object> Get()
        {
            return await _partService.GetList();
        }
        [HttpGet("{no}")]
        public async Task<object> GetPartListNotInPurchaseOrder(int no)
        {
            Task<IEnumerable<Part>> partList = _partService.GetListNotInPurchaseOrder(no);
            return await partList;
        }
    }
}
