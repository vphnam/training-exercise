using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ShopAPI.Models;
using System.Data;
using System.Data.SqlClient;
namespace ShopAPI.Repositories
{
    public interface IPurchaseOrderRepository
    {
        JsonResult GetList();
        JsonResult GetRecord(int no);
        bool Create(PurchaseOrder po);
        bool Update(PurchaseOrder po);
        bool Delete(int no);

    }
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly IConfiguration _configuration;
        public PurchaseOrderRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string query;
        private DataTable table = new DataTable();
        private string sqlDataSource;
        private SqlDataReader myReader;
        public JsonResult GetList()
        {
            query = @"SELECT po.OrderNo, po.SupplierNo, sp.SupplierName, po.StockSite, po.StockName, po.OrderDate, po.SentMail
                    FROM PurchaseOrder po
                    LEFT JOIN Supplier sp ON po.SupplierNo = sp.SupplierNo
                    ORDER BY po.OrderNo;";
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
        public bool Create(PurchaseOrder po)
        {
            query = string.Format("insert into PurchaseOrder(SupplierNo , StockSite , StockName , OrderDate , Note, Address, County, PostCode, SentMail, Status) " +
                "VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}')", po.SupplierNo, po.StockSite, po.StockName, po.OrderDate, po.Note, po.Address, po.County, po.PostCode, po.SentMail, 1);
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlCommand myCommand = new SqlCommand(query, myCon);
                if (myCommand.ExecuteNonQuery() > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public JsonResult GetRecord(int no)
        {
            query = string.Format("SELECT po.OrderNo, sp.SupplierName, po.StockSite, po.StockName, po.OrderDate, po.Note, po.Address, po.County, po.PostCode, po.SentMail, po.Status " +
                "FROM PurchaseOrder po " +
                "JOIN Supplier sp ON po.OrderNo = '{0}' AND po.SupplierNo = sp.SupplierNo " +
                "ORDER BY po.OrderNo; ", no);
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

        public bool Update(PurchaseOrder po)
        {
            query = string.Format("UPDATE PurchaseOrder " +
                "SET SupplierNo = '{0}', StockSite = '{1}', StockName = '{2}', OrderDate = '{3}', Note = '{4}', Address = '{5}', County = '{6}', PostCode = '{7}', SentMail = '{8}', Status = '{9}' " +
                "WHERE OrderNo = '{10}'; ", po.SupplierNo, po.StockSite, po.StockName, po.OrderDate, po.Note, po.Address, po.County, po.PostCode, po.SentMail, po.Status, po.OrderNo);
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlCommand myCommand = new SqlCommand(query, myCon);
                if (myCommand.ExecuteNonQuery() > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public bool Delete(int no)
        {
            query = @"delete from dbo.PurchaseOrder
                      where OrderNo = " + no;
            sqlDataSource = _configuration.GetConnectionString("ExAppConn");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                SqlCommand myCommand = new SqlCommand(query, myCon);
                if (myCommand.ExecuteNonQuery() > 0)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
