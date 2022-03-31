using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;
using ShopAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public interface IPurchaseOrderLineService
    {
        IEnumerable<PurchaseOrderLine> GetList();
        bool Create(PurchaseOrderLine pol);
        PurchaseOrderLine GetRecord(int no);
        IEnumerable<PurchaseOrderLine> GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        bool SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList);
        bool Update(PurchaseOrderLine pol);
        int Delete(DeletePolModel delPol);
    }

    public class PurchaseOrderLineService : IPurchaseOrderLineService
    {
        private readonly IPurchaseOrderLineRepository _polRepo;
        public PurchaseOrderLineService(IPurchaseOrderLineRepository polRepo)
        {
            _polRepo = polRepo;
        }
        public bool Create(PurchaseOrderLine pol)
        {
            return _polRepo.Create(pol);
        }

        public int Delete(DeletePolModel delPol)
        {
            return _polRepo.Delete(delPol);
        }

        public IEnumerable<PurchaseOrderLine> GetList()
        {
            return _polRepo.GetList();
        }

        public PurchaseOrderLine GetRecord(int no)
        {
            return _polRepo.GetRecord(no);
        }
        public IEnumerable<PurchaseOrderLine> GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            return _polRepo.GetAllRecordsOfPurchaseOrderByOrderNo(no);
        }
        public bool Update(PurchaseOrderLine pol)
        {
            return _polRepo.Update(pol);
        }

        public bool SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList)
        {
            return _polRepo.SetQtyAndPriceOfAllGivenPolToZero(polList);
        }
    }
}