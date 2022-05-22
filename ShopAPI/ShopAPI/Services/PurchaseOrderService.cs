using AutoMapper;
using ShopAPI.DomainModel;
using ShopAPI.DTO;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.Managers;
using ShopAPI.Mapping;
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
        private readonly PurchaseOrderManager _poManager;
        private readonly IMapper _mapper;
        public PurchaseOrderService(IPurchaseOrderRepository poRepo, PurchaseOrderManager poManager, IMapper mapper)
        {
            _poRepo = poRepo;
            _poManager = poManager;
            _mapper = mapper;
        }
        public async Task<List<PurchaseOrderListDto>> GetList()
        {
            IEnumerable<PurchaseOrder> poListEntity = await _poRepo.GetList();
            List<PurchaseOrderListDto> poList = new List<PurchaseOrderListDto>();
            foreach(PurchaseOrder item in poListEntity)
            {
                PurchaseOrderListDto po = new PurchaseOrderListDto();
                po.OrderNo = item.OrderNo;
                po.StockSite1 = item.StockSite;
                po.SupplierName = item.SupplierNoNavigation.SupplierName;
                po.StockName = item.StockName;
                po.OrderDate = item.OrderDate;
                po.SentMail = item.SentMail;
                po.Status = item.Status;
                poList.Add(po);
            }
            return poList;
        }
        public async Task<AddPurchaseOrderDto> Create(int SupplierNo, string StockSite, string StockName, DateTime OrderDate,
            string Note, string Address, string County, string PostCode)
        {
            PurchaseOrderDomain poDomain = await _poManager.AddPurchaseOrderAsync(SupplierNo, StockSite, StockName, OrderDate, Note, Address, County, PostCode);

            PurchaseOrder po = await _poRepo.Create(_mapper.Map<PurchaseOrder>(poDomain));
            return _mapper.Map<AddPurchaseOrderDto>(po);
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