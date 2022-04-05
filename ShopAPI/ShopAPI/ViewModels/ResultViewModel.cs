using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.ViewModels
{
    public enum StatusCode
    {
        OK = 200,
        Error = 500
    }
    public class ResultViewModel
    {
        public StatusCode Status { get; private set; }
        public string Message { get; private set; }
        public object Data { get; set; }
        public ResultViewModel(StatusCode status, string message, object data)
        {
            this.Status = status;
            this.Message = message;
            this.Data = data;
        }
    }
}
