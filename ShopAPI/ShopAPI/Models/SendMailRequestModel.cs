using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopAPI.Models
{
    public class SendMailRequestModel
    {
        public string from { get; set; }
        public string to { get; set; }
        public string cc { get; set; }
        public string subject { get; set; }
        public string contains { get; set; }
    }
}
