using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DTO;
using ShopAPI.IServices;
using ShopAPI.Models;
using ShopAPI.ViewModels;
using System;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "NormalUser, SuperUser")]
    public class PoAndPolController : ControllerBase
    {
        private readonly IPoAndPolService _poAndPolService;
        public PoAndPolController(IPoAndPolService poAndPolService)
        {
            _poAndPolService = poAndPolService;
        }
        [HttpPost]
        public async Task<object> SaveChanges(PurchaseOrderDetailDto poDto)
        {
            try
            {
                await _poAndPolService.SaveChanges(poDto);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Save changes successfully", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex.Message);
            }
        }
    }
}