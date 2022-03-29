using ShopAPI.Models;
using ShopAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public interface IPartService
    {
        IEnumerable<Part> GetList();
        IEnumerable<Part> GetListNotInPurchaseOrder(int no);
    }
    public class PartService : IPartService
    {
        private readonly IPartRepository _partRepo;
        public PartService(IPartRepository partRepo)
        {
            _partRepo = partRepo;

        }
        public IEnumerable<Part> GetList()
        {
            return _partRepo.GetList();
        }

        public IEnumerable<Part> GetListNotInPurchaseOrder(int no)
        {
            return _partRepo.GetListNotInPurchaseOrder(no);
        }
    }
}
