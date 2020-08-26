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
    public class HttpClientService : IHttpClientService
    {
        public async Task<TResult> PostFormUrlEncoded<TResult>(string url,
            IEnumerable<KeyValuePair<string, string>> data, Dictionary<string, string> headers = default)
        {
            using var httpClient = new HttpClient();
            using var content = new FormUrlEncodedContent(data);
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
                        SetHeaders(client, headers);
                        HttpResponseMessage response = await client.PostAsync(url, stringContent);
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

        public async Task<T> GetAsync<T>(string url,  Dictionary<string, string> headers = default)
        {
            try
            {
                using (var httpClientHandler = new HttpClientHandler())
                {
                    httpClientHandler.ServerCertificateCustomValidationCallback =
                        (message, cert, chain, errors) => true;
                    using (var client = new HttpClient(httpClientHandler))
                    {
                        SetHeaders(client, headers);
                        HttpResponseMessage response = await client.GetAsync(url);
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