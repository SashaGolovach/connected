using Google.Apis.Auth.OAuth2;

namespace Connected.Models
{
    public interface IClientAuthorizationData
    {
        string UserId { get; set; }
    }
}