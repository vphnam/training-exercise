using ShopAPI.Models;
using ShopAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ShopAPI.Services
{
    public interface IPoAndPolService
    {
        bool SaveChanges(PurchaseOrder po);
    }
    public class PoAndPolService : IPoAndPolService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PoAndPolService(IPurchaseOrderRepository poRepo, IPurchaseOrderLineRepository polRepo)
        {
            _poRepo = poRepo;
            _polRepo = polRepo;
        }
        public bool SaveChanges(PurchaseOrder po)
        {
            bool poRespond = _poRepo.Update(po);
            if(poRespond == true)
            {
                foreach(PurchaseOrderLine pol in po.polList)
                {
                    bool polRespond = _polRepo.Update(pol);
                    if (polRespond == false)
                        return false;
                }
                return true;
            }
            else
                return false;
        }
    }
}