using ShopAPI.Models;
using System.Threading.Tasks;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.DomainModel;
using ShopAPI.Managers;
using AutoMapper;
using ShopAPI.DTO;

namespace ShopAPI.Services
{
    public class SendMailService : ISendMailService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        private readonly PurchaseOrderManager _poManager;
        private readonly IMapper _mapper; 
        public SendMailService(IPurchaseOrderRepository poRepo, PurchaseOrderManager poManager, IMapper mapper)
        {
            _poRepo = poRepo;
            _poManager = poManager;
            _mapper = mapper;
        }
        public async Task SendMail(PurchaseOrderDetailDto poDto)
        {
            PurchaseOrderDomain poDomain = await _poManager.UpdatePurchaseOrderAsync(poDto.OrderNo, poDto.SupplierNo, poDto.StockSite, poDto.StockName, poDto.OrderDate, poDto.Note, poDto.Address, poDto.County, poDto.PostCode, poDto.Status, poDto.SentMail);
            poDomain.SentMail = true;
            PurchaseOrder po = await _poRepo.Update(_mapper.Map<PurchaseOrder>(poDomain));
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
    