using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Connected.Models;
using Microsoft.IdentityModel.Tokens;

namespace Connected.Services
{
    public class AuthService : IAuthService
    {
        private UsersService _usersService;
        private AppSettings _appSettings;

        
        public AuthService(UsersService usersService, AppSettings appSettings)
        {
            _usersService = usersService;
            _appSettings = appSettings;
        }

        public async Task<UserAccessToken> Authenticate(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload)
        {            
            var user = _usersService.Get(payload.Email);
            if (user == null)
            {
                user = new User
                {
                    Email = payload.Email
                };
                _usersService.Create(user);
            }
            return CreateToken(user.Id);
        }
        
        public async Task<UserAccessToken> Authenticate(string username, string password)
        {
            var user = _usersService.Get(username);
            if (user?.Password == password)
                return CreateToken(user.Id);
            return null;
        }
        
        private UserAccessToken CreateToken(string userId)
        {
            // authentication successful so generate jwt token
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