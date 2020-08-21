using System.Collections.Generic;
using Newtonsoft.Json;

namespace Connected.Models.Spotify
{
    public class GetTracksResponse
    {
        [JsonProperty("href")]
        public string HReference { get; set; }
        [JsonProperty("items")]
        public IEnumerable<TrackItem> Tracks { get; set; }
    }
}