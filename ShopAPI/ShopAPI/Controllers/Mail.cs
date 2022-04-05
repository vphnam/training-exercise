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
    public class Mail : ControllerBase
    {
        private readonly ISendMailService _sendMailService;
        public Mail(ISendMailService sendMailService)
        {
            _sendMailService = sendMailService;
        }
        [HttpPost]
        public async Task<object> SendMail(PurchaseOrder po)
        {
            try
            {
                await _sendMailService.SendMail(po);
                return new ResultViewModel(ViewModels.StatusCode.OK, "Send mail successfully!", null);
            }
            catch (Exception ex)
            {
                return new ResultViewModel(ViewModels.StatusCode.Error, "Something went wrong", ex);
            }
        }
    }
}
