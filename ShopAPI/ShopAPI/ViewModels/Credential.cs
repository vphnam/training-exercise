using System.ComponentModel.DataAnnotations;

namespace ShopAPI.ViewModels
{
    public class Credential
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string PassWord { get; set; }
        public Credential(string username, string password)
        {
            this.UserName = username;
            this.PassWord = password;
        }
    }
}
