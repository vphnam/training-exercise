using System;
using System.Collections.Generic;

#nullable disable

namespace ShopAPI.Models
{
    public partial class Role
    {
        public Role()
        {
            UserAccounts = new HashSet<UserAccount>();
        }

        public int RoleNo { get; set; }
        public string RoleName { get; set; }

        public virtual ICollection<UserAccount> UserAccounts { get; set; }
    }
}
