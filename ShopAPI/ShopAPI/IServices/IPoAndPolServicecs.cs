using ShopAPI.DTO;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IPoAndPolService
    {
        Task<PurchaseOrderDetailDto> SaveChanges(PurchaseOrderDetailDto poDto);
    }
}
