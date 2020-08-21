using Google.Apis.Auth.OAuth2;

namespace Connected.Models
{
    public class ClientAuthorizationData : IClientAuthorizationData
    {
        public string UserId { get; set; }
    }
}