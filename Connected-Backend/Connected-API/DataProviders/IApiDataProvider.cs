using System;
using System.Collections.Generic;
using Connected.Enums;

namespace Connected.DataProviders
{
    public interface IApiDataProvider
    {
        Uri BaseApiUrl { get; }
        Dictionary<string, string> GetServiceHeaders(AuthorizationType authorizationType);
    }
}