using System;
using System.Collections.Generic;
using Connected.Enums;
using Connected.Models;

namespace Connected.DataProviders
{
    public interface IApiDataProvider
    {
        string SpotifyApiBaseAddress { get; }
        public string SpotifyAuthBaseAddress { get; }
        Dictionary<string, string> GetApiCredentialHeaders();
        Dictionary<string, string> GetClientCredentialHeaders(User user);

    }
}