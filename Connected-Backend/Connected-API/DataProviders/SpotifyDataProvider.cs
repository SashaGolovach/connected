using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connected.Models;
using Connected.Models.Spotify;
using Connected.Services;
using Google.Apis.Auth.OAuth2;

namespace Connected.DataProviders
{
    public class SpotifyDataProvider : ISpotifyDataProvider
    {
        private readonly IHttpClientService<SpotifyApiDataProvider> _httpClientService;
        private readonly IUsersService _usersService;

        public SpotifyDataProvider(IHttpClientService<SpotifyApiDataProvider> httpClientService,
            IUsersService usersService)
        {
            _httpClientService = httpClientService;
            _usersService = usersService;
        }

        public async Task<IEnumerable<Track>> GetUserTracks()
        {
            var user = _usersService.GetCurrentUser();
            var response = await _httpClientService.GetAsync<GetTracksResponse>("v1/me/tracks");
            return response.Tracks.Select(item => item.Track);
        }

        public async Task<SpotifyUserCredentials> Authentificate(SpotifyAuthRequest authRequest)
        {
            var data = new[]
            {
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("code", authRequest.AuthorizationCode),
                new KeyValuePair<string, string>("redirect_uri", "http://localhost:3000/")
            };
            var token = await _httpClientService.PostFormUrlEncoded<SpotifyUserCredentials>("api/token", data);
            return token;
        }
    }
}