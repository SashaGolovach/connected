using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Connected.Models
{
    public class UserView
    {
        public string Id {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Username { get; set; }
        public IEnumerable<string> ConnectedServices { get; set; }
    }
}