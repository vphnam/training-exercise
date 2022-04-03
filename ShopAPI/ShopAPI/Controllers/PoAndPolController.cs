using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
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
        public async Task<string> SaveChanges(PurchaseOrder pol)
        {
            try
            {
                await _poAndPolService.SaveChanges(pol);
                return ("Save changes successfully");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
    }
}