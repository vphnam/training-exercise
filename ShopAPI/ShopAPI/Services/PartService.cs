using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public class PartService : IPartService
    {
        private readonly IPartRepository _partRepo;
        public PartService(IPartRepository partRepo)
        {
            _partRepo = partRepo;

        }
        public Task<IEnumerable<Part>> GetList()
        {
            return _partRepo.GetList();
        }

        public Task<IEnumerable<Part>> GetListNotInPurchaseOrder(int no)
        {
            return _partRepo.GetListNotInPurchaseOrder(no);
        }
    }
}
