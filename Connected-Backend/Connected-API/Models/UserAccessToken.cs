namespace Connected.Models
{
    public class UserAccessToken
    {
        public UserAccessToken(string token)
        {
            Token = token;
        }

        public string Token { get; set; }
    }
}