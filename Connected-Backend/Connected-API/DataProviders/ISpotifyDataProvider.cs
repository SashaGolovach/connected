using System.Threading.Tasks;
using Connected.Models;

namespace Connected.DataProviders
{
    public interface ISpotifyDataProvider
    {
        Task<SpotifyUserCredentials> Authentificate(SpotifyAuthRequest authRequest);
    }
}