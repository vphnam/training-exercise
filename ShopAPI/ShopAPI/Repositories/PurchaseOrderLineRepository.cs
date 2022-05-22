using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopAPI.IRepositories;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    public class PurchaseOrderLineRepository : IPurchaseOrderLineRepository
    {
        private ExerciseDbContext db;
        public PurchaseOrderLineRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public async Task Create(PurchaseOrderLine pol)
        {
            db.PurchaseOrderLines.Add(pol);
            await db.SaveChangesAsync();
        }

        public async Task Delete(DeletePolModel delPol)
        {
            PurchaseOrderLine pol = await db.PurchaseOrderLines.FindAsync(delPol.partNo,delPol.orderNo);
            int count = await db.PurchaseOrderLines.Where(n => n.OrderNo == pol.OrderNo).CountAsync();
            if(count > 1)
            {
                db.PurchaseOrderLines.Remove(pol);
                await db.SaveChangesAsync();
            }
        } 

        public async Task<IEnumerable<PurchaseOrderLine>> GetList()
        {
            return await db.PurchaseOrderLines.ToListAsync();
        }

        public async Task<PurchaseOrderLine> GetRecord(int partNo,int orderNo)
        {
            return await db.PurchaseOrderLines.FindAsync(partNo,orderNo);

        }
        public async Task<bool> CheckExistByPartAndOrderNo(int partNo, int orderNo)
        {
            return await db.PurchaseOrderLines.Where(n => n.PartNo == partNo && n.OrderNo == orderNo).AnyAsync();
        }
        public async Task<int> CountLineOfPurchaseOrder(int orderNo)
        {
            return await db.PurchaseOrderLines.Where(n => n.OrderNo == orderNo).CountAsync();
        }
        public async Task<IEnumerable<PurchaseOrderLine>> GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            return await db.PurchaseOrderLines.Where(n => n.OrderNo == no).OrderBy(n => n.PartNo).ToListAsync();
        }

        public async Task<PurchaseOrderLine> Update(PurchaseOrderLine pol)
        {
            db.PurchaseOrderLines.Update(pol);
            await db.SaveChangesAsync();
            return pol;
        }

        public async Task UpdateList(IEnumerable<PurchaseOrderLine> polList)
        {
            foreach (PurchaseOrderLine pol in polList)
            {
                db.PurchaseOrderLines.Update(pol);
            }
            await db.SaveChangesAsync();
        }

        public async Task SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList)
        {
            foreach (PurchaseOrderLine pol in polList)
            {
                pol.QuantityOrder = 0;
                pol.BuyPrice = 0;
                db.PurchaseOrderLines.Update(pol);
            }
            await db.SaveChangesAsync();
        }
    }
}