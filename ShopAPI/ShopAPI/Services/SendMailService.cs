using Microsoft.Extensions.Options;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
using System.IO;
using MailKit.Net.Smtp;
using MailKit.Security;
using ShopAPI.Repositories;
using Microsoft.Extensions.Configuration;

namespace ShopAPI.Services
{
    public interface ISendMailService
    {
         bool SendMail(PurchaseOrder po);
    }
    public class SendMailService : ISendMailService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        public SendMailService(IPurchaseOrderRepository poRepo)
        {
            _poRepo = poRepo;

        }
        public bool SendMail(PurchaseOrder po)
        {
            if (po != null)
            {
                _poRepo.Update(po);
                return true;
            }
            else
                return false;
           

            /*
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(mailRequestModel.from);
            email.To.Add(MailboxAddress.Parse(mailRequestModel.to));
            email.Subject = mailRequestModel.subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = mailRequestModel.contains;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(mailRequestModel.from, "H~~~~~7");
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            */
        }
    }
}
    