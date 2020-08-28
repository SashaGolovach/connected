using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connected.Enums;
using Connected.Models;
using Connected.Models.Spotify;
using Connected.Services;
using Google.Apis.Auth.OAuth2;

namespace Connected.DataProviders
{
    public class SpotifyDataProvider : ISpotifyDataProvider
    {
        private readonly IHttpClientService _httpClientService;
        private readonly IUsersService _usersService;
        private readonly SpotifyApiDataProvider _spotifyApiDataProvider;

        public SpotifyDataProvider(IHttpClientService httpClientService,
            IUsersService usersService, SpotifyApiDataProvider spotifyApiDataProvider)
        {
            _httpClientService = httpClientService;
            _usersService = usersService;
            _spotifyApiDataProvider = spotifyApiDataProvider;
        }

        public async Task<IEnumerable<Track>> GetUserTracks(string userId)
        {
            var user = _usersService.GetUserById(userId);
            if(user.ConnectedServicesCredentials.SpotifyUserCredentials == null)
                throw new Exception("User does not have spotfiy credentials");
            var headers = _spotifyApiDataProvider.GetClientCredentialHeaders(user);
            var response = await _httpClientService.GetAsync<GetTracksResponse>(_spotifyApiDataProvider.SpotifyApiBaseAddress + "v1/me/tracks", headers);
            return response.Tracks.Select(item => item.Track);
        }

        public async Task<SpotifyUserCredentials> Authentificate(SpotifyAuthRequest authRequest)
        {
            var data = new[]
            {
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("code", authRequest.AuthorizationCode),
                new KeyValuePair<string, string>("redirect_uri", @"https://connected-eu.netlify.app/connections?isSpotify=true")
            };
            var headers = _spotifyApiDataProvider.GetApiCredentialHeaders();
            var token = await _httpClientService.PostFormUrlEncoded<SpotifyUserCredentials>(_spotifyApiDataProvider.SpotifyAuthBaseAddress + "api/token", data, headers);
            return token;
        }
    }
}