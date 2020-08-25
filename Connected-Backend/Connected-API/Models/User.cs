using System;
using System.Collections.Generic;
using System.Linq;
using Google.Apis.Auth.OAuth2;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Connected.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public ConnectedServicesCredentials ConnectedServicesCredentials { get; set; } = new ConnectedServicesCredentials();
        public IEnumerable<string> ConnectedServices => new[] {ConnectedServicesCredentials.SpotifyUserCredentials.Connected ? "Spotify" : null}.Select(
            c => c ! + null);
    }
}