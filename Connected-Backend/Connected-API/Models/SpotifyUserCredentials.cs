using Newtonsoft.Json;

namespace Connected.Models
{
    public class SpotifyUserCredentials
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("token_type")]

        public string TokenType { get; set; }
        [JsonProperty("refresh_token")]

        public string RefreshToken { get; set; }
        [JsonProperty("scope")]

        public string Scope { get; set; }
        
        public bool Connected => !string.IsNullOrEmpty(AccessToken);
    }
}