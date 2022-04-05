using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System;
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
        public async Task<object> SaveChanges(PurchaseOrder pol)
        {
            try
            {
                await _poAndPolService.SaveChanges(pol);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Save changes successfully", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
    }
}