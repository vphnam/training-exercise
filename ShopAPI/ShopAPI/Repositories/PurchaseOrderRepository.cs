using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ShopAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace ShopAPI.Repositories
{
    public interface IPurchaseOrderRepository
    {
        IEnumerable<PurchaseOrder> GetList();
        PurchaseOrder GetRecord(int no);
        bool Create(PurchaseOrder po);
        bool Update(PurchaseOrder po);
        bool Delete(int no);

    }
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private ExerciseDbContext db;
        public PurchaseOrderRepository(IConfiguration configuration)
        {
            db = new ExerciseDbContext(configuration);
        }
        public IEnumerable<PurchaseOrder> GetList()
        {
            IEnumerable<PurchaseOrder> poList = db.PurchaseOrders.OrderBy(n => n.OrderNo).ToList();   
            foreach(PurchaseOrder po in poList)
            {
                po.SupplierNoNavigation = db.Suppliers.Find(po.SupplierNo);
            }
            return poList;
        }
        public bool Create(PurchaseOrder po)
        {
            if (po != null)
            {
                db.PurchaseOrders.Add(po);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public PurchaseOrder GetRecord(int no)
        {
            PurchaseOrder poEntity = db.PurchaseOrders.Where(n => n.OrderNo == no).FirstOrDefault();
            poEntity.SupplierNoNavigation = db.Suppliers.Find(poEntity.SupplierNo);
            poEntity.StockSiteNavigation = db.StockSites.Find(poEntity.StockSite);
            return poEntity;
        }

        public bool Update(PurchaseOrder po)
        {
            PurchaseOrder poEntity = db.PurchaseOrders.Where(n => n.OrderNo == po.OrderNo).FirstOrDefault();
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
                else
                {
                    return false;
                }
            }
            db.PurchaseOrders.Update(poEntity);
            db.SaveChanges();
            return true;
        }

        public bool Delete(int no)
        {
            PurchaseOrder poEntity = db.PurchaseOrders.Where(n => n.OrderNo == no).FirstOrDefault();
            if (poEntity != null)
            {
                db.PurchaseOrders.Remove(poEntity);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}