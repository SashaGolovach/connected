using System;
using Connected.Models;
using Connected.Services;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;

namespace Connected.DataProviders
{
    public class YouTubeDataProvider
    {
        private readonly AppSettings _appSettings;
        private readonly IUsersService _usersService;
        private readonly UserCredential _userCredential;
        
        public YouTubeDataProvider(AppSettings appSettings, IUsersService usersService)
        {
            _appSettings = appSettings;
            _usersService = usersService;
            SetUserCredentials();
        }

        private void SetUserCredentials()
        {
            var currentUser = _usersService.GetCurrentUser();
            var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = _appSettings.GoogleClientId,
                    ClientSecret = _appSettings.GoogleClientSecret
                },
                Scopes = new [] {
                    YouTubeService.Scope.Youtube
                },
                DataStore = new FileDataStore("Store")
            });

            var token = new TokenResponse { 
                AccessToken = "[your_access_token_here]",
                RefreshToken = "[your_refresh_token_here]"
            };

            var credential = new UserCredential(flow, Environment.UserName, token); 
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = this.GetType().ToString()
            });
        }
    }
}