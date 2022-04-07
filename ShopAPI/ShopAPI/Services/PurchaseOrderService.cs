using Microsoft.AspNetCore.Mvc;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        private readonly ISupplierService _supService;
        private readonly IStockSiteService _stService;
        public PurchaseOrderService(IPurchaseOrderRepository poRepo, ISupplierService supService, IStockSiteService stService)
        {
            _poRepo = poRepo;
            _supService = supService;
            _stService = stService;
 
        }
        public async Task<IEnumerable<PurchaseOrder>> GetList()
        {
            IEnumerable<PurchaseOrder> poList = await _poRepo.GetList();
            foreach(PurchaseOrder item in poList)
            {
                item.SupplierNoNavigation = await _supService.GetByNo(item.SupplierNo);
                item.StockSiteNavigation = await _stService.GetByNo(item.StockSite);
            }
            return await _poRepo.GetList();
        }
        public async Task Create(PurchaseOrder po)
        {
            await _poRepo.Create(po);
        }
        public async Task<PurchaseOrder> GetRecord(int no)
        {
            return await _poRepo.GetRecord(no);
        }

        public async Task Update(PurchaseOrder po)
        {
            await _poRepo.Update(po);
        }

        public async Task Delete(int no)
        {
            await _poRepo.Delete(no);
        }
    }
}