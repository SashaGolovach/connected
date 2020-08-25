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
        
        public Uri BaseApiUrl => new Uri(@"https://api.spotify.com");

        public Dictionary<string, string> GetServiceHeaders(AuthorizationType authorizationType)
        {
            var headers = new Dictionary<string, string>();
            switch (authorizationType)
            {
                case AuthorizationType.ClientAuth:
                    var user = _usersService.GetCurrentUser();
                    headers.Add("Authorization", $"{user.ConnectedServicesCredentials.SpotifyUserCredentials.TokenType} {user.ConnectedServicesCredentials.SpotifyUserCredentials.AccessToken}");
                    break;
                case AuthorizationType.ServerAuth:
                    headers.Add("Authorization", "Basic " + $"{_appSettings.SpotifyClientId}:{_appSettings.SpotifyClientSecret}".ToBase64());
                    break;
            }
            return headers;
        }
    }
}