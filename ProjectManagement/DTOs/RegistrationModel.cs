using System.Collections.Generic;

namespace ProjectManagement.DTOs
{
    public class RegisterModel
    {

        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        //public bool AllClients { get; set; }
        //public List<int> UserClients { get; set; }
        public List<string> Roles { get; set; }

    }
}
