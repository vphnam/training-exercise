using ShopAPI.Models;
using System.Threading.Tasks;
using ShopAPI.IRepositories;
using ShopAPI.IServices;

namespace ShopAPI.Services
{
    public class SendMailService : ISendMailService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        public SendMailService(IPurchaseOrderRepository poRepo)
        {
            _poRepo = poRepo;

        }
        public async Task SendMail(PurchaseOrder po)
        {
            await _poRepo.Update(po);
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
    