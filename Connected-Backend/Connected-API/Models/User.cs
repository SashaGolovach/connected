using System;
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
        public Google.Apis.Auth.GoogleJsonWebSignature.Payload GoogleCredentials { get; set; }
        public SpotifyUserCredentials SpotifyUserCredentials { get; set; }
    }

    public class UserView
    {
        public string tokenId {get; set;}
        public string accessToken {get; set;}
    }
}