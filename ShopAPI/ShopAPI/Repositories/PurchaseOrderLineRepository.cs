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
        JsonResult GetList();
        JsonResult GetRecord(int no);
        JsonResult GetAllRecordsOfPurchaseOrderByOrderNo(int no);
        bool Create(PurchaseOrderLine pol);
        bool Update(PurchaseOrderLine pol);
        bool Delete(int no);
    }
    public class PurchaseOrderLineRepository : IPurchaseOrderLineRepository
    {
        private readonly IConfiguration _configuration;
        private string query;
        private DataTable table = new DataTable();
        private string sqlDataSource;
        private SqlDataReader myReader;
        public PurchaseOrderLineRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public bool Create(PurchaseOrderLine pol)
        {
            query = string.Format("insert into PurchaseOrderLine(OrderNo, PartDescription, Manufacturer, OrderDate, QuantityOrder, BuyPrice, Memo) " +
                                   "VALUES('{0}','{1}','{2}','{3}','{4}','{5}','{6}'); ", pol.OrderNo, pol.PartDescription, pol.Manufacturer, pol.OrderDate, pol.QuantityOrder, pol.BuyPrice, pol.MeMo);
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlCommand myCommand = new SqlCommand(query, myCon);
                if (myCommand.ExecuteNonQuery() > 0)
                {
                    return true;
                }
                else
                    return false;
            }
        }

        public bool Delete(int no)
        {
            query = string.Format("delete from dbo.PurchaseOrderLine where PartNo = " + no + " ;");
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (myCommand.ExecuteNonQuery() > 0)
                    {
                        return true;
                    }
                    else
                        return false;
                }  
            }
        } 

        public JsonResult GetList()
        {
            query = @"select PartNo, OrderNo, PartDescription, Manufacturer, OrderDate, QuantityOrder, BuyPrice, Memo 
                      from dbo.PurchaseOrderLine 
                      order by PartNo; ";
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        public JsonResult GetRecord(int no)
        {
            query = @"select PartNo, OrderNo, PartDescription, Manufacturer, OrderDate, QuantityOrder, BuyPrice, Memo 
                      from dbo.PurchaseOrderLine
                      where PartNo = " + no;
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        public JsonResult GetAllRecordsOfPurchaseOrderByOrderNo(int no)
        {
            query = @"select PartNo, OrderNo, PartDescription, Manufacturer, OrderDate, QuantityOrder, BuyPrice, Memo, (QuantityOrder * BuyPrice) as Amount
                      from dbo.PurchaseOrderLine
                      where OrderNo = " + no;
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        public bool Update(PurchaseOrderLine pol)
        {
            query = String.Format("update PurchaseOrderLine " +
                "set OrderNo = '{0}', PartDescription = '{1}', Manufacturer = '{2}', OrderDate = '{3}', QuantityOrder = '{4}', BuyPrice = '{5}', Memo = '{6}' " +
                "WHERE PartNo = '{7}';", pol.OrderNo, pol.PartDescription, pol.Manufacturer, pol.OrderDate, pol.QuantityOrder, pol.BuyPrice, pol.MeMo, pol.PartNo);
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if(myCommand.ExecuteNonQuery() > 0)
                    {
                        return true;
                    }
                    else
                        return false;
                }
                
            }
        }
    }
}
