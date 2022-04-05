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
            foreach(PurchaseOrder po in poList)
            {
                po.SupplierNoNavigation = await db.Suppliers.FindAsync(po.SupplierNo);
                po.StockSiteNavigation = await db.StockSites.FindAsync(po.StockSite);
                po.polList = await db.PurchaseOrderLines.Where(n => n.OrderNo == po.OrderNo).ToListAsync();
            }
            return poList;
        }
        public async Task Create(PurchaseOrder po)
        {
            db.PurchaseOrders.Add(po);
            await db.SaveChangesAsync();
        }

        public async Task<PurchaseOrder> GetRecord(int no)
        {
            PurchaseOrder poEntity = await db.PurchaseOrders.Where(n => n.OrderNo == no).FirstOrDefaultAsync();
            poEntity.SupplierNoNavigation = await db.Suppliers.FindAsync(poEntity.SupplierNo);
            poEntity.StockSiteNavigation = await db.StockSites.FindAsync(poEntity.StockSite);
            return poEntity;
        }

        public async Task Update(PurchaseOrder po)
        {
            PurchaseOrder poEntity = await db.PurchaseOrders.Where(n => n.OrderNo == po.OrderNo).FirstOrDefaultAsync();
            if(po.Status == false)
            {
                poEntity.Status = po.Status;
            }
            else
            {
                if (poEntity != null)
                {
                    poEntity.SupplierNo = po.SupplierNo;
                    poEntity.StockSite = po.StockSite;
                    poEntity.StockName = po.StockName;
                    poEntity.OrderDate = po.OrderDate;
                    poEntity.Note = po.Note;
                    poEntity.Address = po.Address;
                    poEntity.County = po.County;
                    poEntity.PostCode = po.PostCode;
                    poEntity.SentMail = po.SentMail;
                }
            }
            db.PurchaseOrders.Update(poEntity);
            await db.SaveChangesAsync();
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