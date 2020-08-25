using Newtonsoft.Json;

namespace Connected.Models.Spotify
{
    public class Track
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}