using ShopAPI.Models;
using System.Threading.Tasks;
using ShopAPI.IRepositories;
using ShopAPI.IServices;

namespace ShopAPI.Services
{
    public class PoAndPolService : IPoAndPolService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PoAndPolService(IPurchaseOrderRepository poRepo, IPurchaseOrderLineRepository polRepo)
        {
            _poRepo = poRepo;
            _polRepo = polRepo;
        }
        public async Task SaveChanges(PurchaseOrder po)
        {
           await _poRepo.Update(po);
           foreach(PurchaseOrderLine pol in po.polList)
           {
              await _polRepo.Update(pol);
           }
        }
    }
}