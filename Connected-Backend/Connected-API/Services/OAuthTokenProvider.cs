using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Connected.Models;
using Microsoft.IdentityModel.Tokens;

namespace Connected.Services
{
    public class OAuthTokenProvider : IOAuthTokenProvider
    {
        private readonly AppSettings _appSettings;

        public OAuthTokenProvider(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }
        
        public UserAccessToken RegisterToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, userId)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = new UserAccessToken(tokenHandler.WriteToken(token));
            return accessToken;
        } 
    }
}