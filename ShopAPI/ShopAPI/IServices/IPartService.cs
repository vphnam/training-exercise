using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.IServices
{
    public interface IPartService
    {
        Task<IEnumerable<Part>> GetList();
        Task<IEnumerable<Part>> GetListNotInPurchaseOrder(int no);
    }
}
