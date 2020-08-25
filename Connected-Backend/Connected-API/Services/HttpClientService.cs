using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Connected.DataProviders;
using Connected.Enums;
using Microsoft.Extensions.Localization;
using Newtonsoft.Json;

namespace Connected.Services
{
    public class HttpClientService<TApiProvider> : IHttpClientService<TApiProvider>
        where TApiProvider : IApiDataProvider
    {
        private readonly TApiProvider _apiProvider;

        public HttpClientService(TApiProvider apiProvider)
        {
            _apiProvider = apiProvider;
        }

        public async Task<TResult> PostFormUrlEncoded<TResult>(string url,
            IEnumerable<KeyValuePair<string, string>> data)
        {
            using var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(@"https://accounts.spotify.com");
            using var content = new FormUrlEncodedContent(data);
            var headers = _apiProvider.GetServiceHeaders(AuthorizationType.ServerAuth);
            content.Headers.Clear();
            content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            SetHeaders(httpClient, headers);
            HttpResponseMessage response = await httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<TResult>();
        }

        public async Task<string> PostAsync(string url, string content, Dictionary<string, string> headers = default)
        {
            StringContent stringContent = MakeJsonContent(content);
            try
            {
                using (var httpClientHandler = new HttpClientHandler())
                {
                    httpClientHandler.ServerCertificateCustomValidationCallback =
                        (message, cert, chain, errors) => true;
                    using (var client = new HttpClient(httpClientHandler))
                    {
                        SetHeaders(client, _apiProvider.GetServiceHeaders(AuthorizationType.ClientAuth));
                        HttpResponseMessage response = await client.PostAsync(_apiProvider.BaseApiUrl + url, stringContent);
                        response.EnsureSuccessStatusCode();
                        byte[] responseBytes = await response.Content.ReadAsByteArrayAsync();
                        string responseString = Encoding.UTF8.GetString(responseBytes);
                        return responseString;
                    }
                }
            }
            catch (HttpRequestException exception)
            {
                throw;
            }
        }

        public async Task<T> GetAsync<T>(string url)
        {
            try
            {
                using (var httpClientHandler = new HttpClientHandler())
                {
                    httpClientHandler.ServerCertificateCustomValidationCallback =
                        (message, cert, chain, errors) => true;
                    using (var client = new HttpClient(httpClientHandler))
                    {
                        SetHeaders(client, _apiProvider.GetServiceHeaders(AuthorizationType.ClientAuth));
                        HttpResponseMessage response = await client.GetAsync(_apiProvider.BaseApiUrl + url);
                        response.EnsureSuccessStatusCode();
                        byte[] responseBytes = await response.Content.ReadAsByteArrayAsync();
                        string responseString = Encoding.UTF8.GetString(responseBytes);
                        return JsonConvert.DeserializeObject<T>(responseString);
                    }
                }
            }
            catch (HttpRequestException exception)
            {
                throw;
            }
        }

        private static void SetHeaders(HttpClient client, Dictionary<string, string> headers)
        {
            if (headers == null)
            {
                headers = new Dictionary<string, string>();
            }

            headers.Add("Accept-Language", CultureInfo.CurrentCulture.Name);
            foreach ((string key, string value) in headers)
            {
                client.DefaultRequestHeaders.Add(key, value);
            }
        }

        private static StringContent MakeJsonContent(string content)
        {
            return new StringContent(content, Encoding.UTF8, "application/json");
        }
    }
}