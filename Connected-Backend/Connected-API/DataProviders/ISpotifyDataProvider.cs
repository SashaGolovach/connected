using System.Collections.Generic;
using System.Threading.Tasks;
using Connected.Models;
using Connected.Models.Spotify;

namespace Connected.DataProviders
{
    public interface ISpotifyDataProvider
    {
        Task<SpotifyUserCredentials> Authentificate(SpotifyAuthRequest authRequest);
        Task<IEnumerable<Track>> GetUserTracks(string userId);
    }
}