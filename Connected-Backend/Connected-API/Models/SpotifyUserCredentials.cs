using System;
using Newtonsoft.Json;

namespace Connected.Models
{
    public class SpotifyUserCredentials
    {
        private int _expiresIn;

        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
        [JsonProperty("scope")]
        public string Scope { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn
        {
            get => _expiresIn;
            set
            {
                Expires = DateTime.Now.AddSeconds(value);
                _expiresIn = value;  
            } 
        }

        public DateTime Expires { get; set; }
        
        public bool Connected => DateTime.UtcNow < Expires;
    }
}