using Microsoft.AspNetCore.Mvc;
using ShopAPI.IServices;
using ShopAPI.Models;
using System.Threading.Tasks;

namespace ShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Mail : ControllerBase
    {
        private readonly ISendMailService _sendMailService;
        public Mail(ISendMailService sendMailService)
        {
            _sendMailService = sendMailService;
        }
        [HttpPost]
        public async Task<string> SendMail(PurchaseOrder po)
        {
            try
            {
                await _sendMailService.SendMail(po);
                return ("Send mail successfully!");
            }
            catch
            {
                return ("Something went wrong");
            }
        }
    }
}
