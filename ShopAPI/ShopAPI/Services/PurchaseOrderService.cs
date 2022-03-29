using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public interface IPurchaseOrderService
    {
        IEnumerable<PurchaseOrder> GetList();
        bool Create(PurchaseOrder po);
        PurchaseOrder GetRecord(int no);
        bool Update(PurchaseOrder po);
        bool Delete(int no);
    }
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        public PurchaseOrderService(IPurchaseOrderRepository poRepo)
        {
            _poRepo = poRepo;
 
        }
        public IEnumerable<PurchaseOrder> GetList()
        {
            return _poRepo.GetList();
        }
        public bool Create(PurchaseOrder po)
        {
            bool res = _poRepo.Create(po);
            return res;
        }
        public PurchaseOrder GetRecord(int no)
        {
            return _poRepo.GetRecord(no);
        }

        public bool Update(PurchaseOrder po)
        {
            bool res = _poRepo.Update(po);
            return res;
        }

        public bool Delete(int no)
        {
            bool res = _poRepo.Delete(no);
            return res;
        }
    }
}