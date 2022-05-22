using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private ExerciseDbContext db;
        public PurchaseOrderRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public async Task<IEnumerable<PurchaseOrder>> GetList()
        {
            IEnumerable<PurchaseOrder> poList = await db.PurchaseOrders.OrderBy(n => n.OrderNo).ToListAsync();
            foreach(PurchaseOrder item in poList)
            {
                item.SupplierNoNavigation = await db.Suppliers.FindAsync(item.SupplierNo);
                item.StockSiteNavigation = await db.StockSites.FindAsync(item.StockSite);
            }
            return await db.PurchaseOrders.OrderBy(n => n.OrderNo).ToListAsync();
        }
        public async Task<PurchaseOrder> Create(PurchaseOrder po)
        {
            db.PurchaseOrders.Add(po);
            await db.SaveChangesAsync();
            return po;
        }

        public async Task<PurchaseOrder> GetRecord(int no)
        {
            PurchaseOrder poEntity = await db.PurchaseOrders.Where(n => n.OrderNo == no).FirstOrDefaultAsync();
            poEntity.SupplierNoNavigation = await db.Suppliers.FindAsync(poEntity.SupplierNo);
            poEntity.StockSiteNavigation = await db.StockSites.FindAsync(poEntity.StockSite);
            return poEntity;
        }
        public async Task<bool> CheckExistByOrderNo(int orderNo)
        {
            return await db.PurchaseOrders.Where(n => n.OrderNo == orderNo).AnyAsync();
        }
        public async Task<PurchaseOrder> Update(PurchaseOrder po)
        {
            db.PurchaseOrders.Update(po);
            await db.SaveChangesAsync();
            return po;
        }

        public async Task Delete(int no)
        {
            PurchaseOrder poEntity = await db.PurchaseOrders.Where(n => n.OrderNo == no).FirstOrDefaultAsync();
            if (poEntity != null)
            {
                db.PurchaseOrders.Remove(poEntity);
                await db.SaveChangesAsync();
            }
        }
    }
}