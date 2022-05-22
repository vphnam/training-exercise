using AutoMapper;
using ShopAPI.DomainModel;
using ShopAPI.DTO;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<PurchaseOrder, AddPurchaseOrderDto>();
            CreateMap<AddPurchaseOrderDto, PurchaseOrder>();

            CreateMap<PurchaseOrder, PurchaseOrderDomain>();
            CreateMap<PurchaseOrderDomain, PurchaseOrder>();

            CreateMap<PurchaseOrder, PurchaseOrderDetailDto>();
            CreateMap<PurchaseOrderDetailDto, PurchaseOrder>();

            CreateMap<PurchaseOrderLine, PurchaseOrderLineListDto>();
            CreateMap<PurchaseOrderLineListDto, PurchaseOrderLine>();

            CreateMap<PurchaseOrderLine, PurchaseOrderLineDomain>();
            CreateMap<PurchaseOrderLineDomain, PurchaseOrderLine>();
        }
    }
}
