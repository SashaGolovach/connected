using System;
using System.Collections.Generic;
using Connected.Enums;
using Connected.Extensions;
using Connected.Models;
using Connected.Services;

namespace Connected.DataProviders
{
    public class SpotifyApiDataProvider : IApiDataProvider
    {
        private readonly IUsersService _usersService;
        private readonly AppSettings _appSettings;

        public SpotifyApiDataProvider(IUsersService usersService, AppSettings appSettings)
        {
            _usersService = usersService;
            _appSettings = appSettings;
        }

        public string SpotifyApiBaseAddress => @"https://api.spotify.com/";
        public string SpotifyAuthBaseAddress => @"https://accounts.spotify.com/";

        public Dictionary<string, string> GetApiCredentialHeaders()
        {
            var headers = new Dictionary<string, string>();
            headers.Add("Authorization",
                "Basic " + $"{_appSettings.SpotifyClientId}:{_appSettings.SpotifyClientSecret}".ToBase64());
            return headers;
        }

        public Dictionary<string, string> GetClientCredentialHeaders(User user)
        {
            var headers = new Dictionary<string, string>();
            headers.Add("Authorization",
                $"{user.ConnectedServicesCredentials.SpotifyUserCredentials.TokenType} {user.ConnectedServicesCredentials.SpotifyUserCredentials.AccessToken}");
            return headers;
        }
    }
}