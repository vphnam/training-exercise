using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShopAPI.Services
{

    public class PurchaseOrderLineService : IPurchaseOrderLineService
    {
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PurchaseOrderLineService(IPurchaseOrderLineRepository polRepo)
        {
            _polRepo = polRepo;
        }
        public async Task Create(PurchaseOrderLine pol)
        {
            await _polRepo.Create(pol);
        }

        public async Task Delete(DeletePolModel delPol)
        {
            await _polRepo.Delete(delPol);
        }

        public async Task<IEnumerable<PurchaseOrderLine>> GetList()
        {
            return await _polRepo.GetList();
        }

        public async Task<PurchaseOrderLine> GetRecord(int no)
        {
            return await _polRepo.GetRecord(no);
        }
        public async Task<IEnumerable<PurchaseOrderLine>> GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            return await _polRepo.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        public async Task Update(PurchaseOrderLine pol)
        {
            await _polRepo.Update(pol);
        }
        public async Task UpdateList(IEnumerable<PurchaseOrderLine> polList)
        {
            await _polRepo.UpdateList(polList);
        }
        public async Task SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList)
        {
            await _polRepo.SetQtyAndPriceOfAllGivenPolToZero(polList);
        }
    }
}