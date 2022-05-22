using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ShopAPI.Models
{
    public partial class UserAccount
    {
        public int UserNo { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string PassWord { get; set; }
        public int RoleNo { get; set; }

        public virtual Role RoleNoNavigation { get; set; }
    }
}
