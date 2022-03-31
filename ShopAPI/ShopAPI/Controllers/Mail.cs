using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public JsonResult SendMail(PurchaseOrder po)
        {   
            bool res = _sendMailService.SendMail(po);
            if (res == true)
                return new JsonResult("Send mail successfully!");
            else
                return new JsonResult("Something went wrong");

        }
    }
}
