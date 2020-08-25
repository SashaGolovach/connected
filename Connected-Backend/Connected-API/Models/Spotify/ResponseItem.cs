using Newtonsoft.Json;

namespace Connected.Models.Spotify
{
    public class TrackItem
    {
        [JsonProperty("track")]
        public Track Track  { get; set; }
    }
}