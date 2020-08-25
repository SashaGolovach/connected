using System.Collections.Generic;
using System.Threading.Tasks;
using Connected.DataProviders;

namespace Connected.Services
{
    public interface IHttpClientService<TApiProvider> where TApiProvider : IApiDataProvider
    {
        Task<string> PostAsync(string url, string content, Dictionary<string, string> headers = default);
        Task<TResult> PostFormUrlEncoded<TResult>(string url, IEnumerable<KeyValuePair<string, string>> data);
        Task<T> GetAsync<T>(string url);
    }
}