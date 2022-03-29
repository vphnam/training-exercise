using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Repositories
{
    
    public interface IPurchaseOrderLineRepository
    {
        IEnumerable<PurchaseOrderLine> GetList();
        PurchaseOrderLine GetRecord(int no);
        IEnumerable<PurchaseOrderLine> GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        bool SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList);
        bool Create(PurchaseOrderLine pol);
        bool Update(PurchaseOrderLine pol);
        bool Delete(DeletePolModel delPol);
    }
    public class PurchaseOrderLineRepository : IPurchaseOrderLineRepository
    {
        private ExerciseDbContext db;
        public PurchaseOrderLineRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public bool Create(PurchaseOrderLine pol)
        {
            if (pol != null)
            {
                db.PurchaseOrderLines.Add(pol);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool Delete(DeletePolModel delPol)
        {
            PurchaseOrderLine pol = db.PurchaseOrderLines.Find(delPol.partNo,delPol.orderNo);
            if (pol != null)
            {
                db.PurchaseOrderLines.Remove(pol);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        } 

        public IEnumerable<PurchaseOrderLine> GetList()
        {
            IEnumerable<PurchaseOrderLine> polList = db.PurchaseOrderLines.ToList();
            return polList;
        }

        public PurchaseOrderLine GetRecord(int no)
        {
            PurchaseOrderLine pol = db.PurchaseOrderLines.Find(no);
            return pol;
           
        }
        public IEnumerable<PurchaseOrderLine> GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            IEnumerable<PurchaseOrderLine> polList = db.PurchaseOrderLines.Where(n => n.OrderNo == no).ToList();
            return polList;
        }

        public bool Update(PurchaseOrderLine pol)
        {
            if (pol != null)
            {
                db.PurchaseOrderLines.Update(pol);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool SetQtyAndPriceOfAllGivenPolToZero(IEnumerable<PurchaseOrderLine> polList)
        {
            if (polList != null)
            {
                foreach (PurchaseOrderLine pol in polList)
                {
                    pol.QuantityOrder = 0;
                    pol.BuyPrice = 0;
                    db.PurchaseOrderLines.Update(pol);
                }
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}