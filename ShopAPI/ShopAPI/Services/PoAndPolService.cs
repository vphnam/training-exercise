using ShopAPI.Models;
using System.Threading.Tasks;
using ShopAPI.IRepositories;
using ShopAPI.IServices;
using ShopAPI.DTO;
using ShopAPI.Managers;
using AutoMapper;
using ShopAPI.DomainModel;
using System.Collections.Generic;

namespace ShopAPI.Services
{
    public class PoAndPolService : IPoAndPolService
    {
        private readonly IPurchaseOrderRepository _poRepo;
        private readonly IPurchaseOrderLineRepository _polRepo;
        private readonly PurchaseOrderManager _poManager;
        private readonly PurchaseOrderLineManager _polManager;
        private readonly IMapper _mapper;
        public PoAndPolService(IPurchaseOrderRepository poRepo, IPurchaseOrderLineRepository polRepo, PurchaseOrderManager poManager, PurchaseOrderLineManager polManager, IMapper mapper)
        {
            _poRepo = poRepo;
            _polRepo = polRepo;
            _poManager = poManager;
            _polManager = polManager;
            _mapper = mapper;
        }
        public async Task<PurchaseOrderDetailDto> SaveChanges(PurchaseOrderDetailDto poDto)
        {
            PurchaseOrderDomain poDomain = await _poManager.UpdatePurchaseOrderAsync(poDto.OrderNo, poDto.SupplierNo, poDto.StockSite, poDto.StockName, poDto.OrderDate, poDto.Note, poDto.Address, poDto.County, poDto.PostCode, poDto.Status, poDto.Status);
            PurchaseOrder po =  await _poRepo.Update(_mapper.Map<PurchaseOrder>(poDomain));
            po.polList = new List<PurchaseOrderLine>();
            foreach(PurchaseOrderLineListDto pol in poDto.polList)
            {
                PurchaseOrderLineDomain polDomain = await _polManager.UpdatePurchaseOrderLineAsync(pol.PartNo, pol.OrderNo, pol.PartDescription, pol.Manufacturer, pol.OrderDate, pol.QuantityOrder, pol.BuyPrice, pol.Memo);
                PurchaseOrderLine polEn = await _polRepo.Update(_mapper.Map<PurchaseOrderLine>(polDomain));
                po.polList.Add(polEn);
            }
            return _mapper.Map<PurchaseOrderDetailDto>(po);
        }
    }
}