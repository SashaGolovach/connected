using Connected.Models;

namespace Connected.Services
{
    public interface IOAuthTokenProvider
    {
        UserAccessToken RegisterToken(string userId);
    }
}