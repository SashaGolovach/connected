using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Connected.DataProviders;
using Connected.Models;
using Connected.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Connected.Controllers
{
    [Route("auth")]
    [Authorize]
    public class AuthController
    {
        private IAuthService _authService;
        private readonly ISpotifyDataProvider _spotifyApiDataProvider;
        private readonly IUsersService _usersService;

        public AuthController(IAuthService authService, ISpotifyDataProvider spotifyApiDataProvider,
            IUsersService usersService)
        {
            _authService = authService;
            _spotifyApiDataProvider = spotifyApiDataProvider;
            _usersService = usersService;
        }

        [HttpGet("")]
        public IActionResult AuthGet()
        {
            return new JsonResult("it works");
        }

        [HttpPost("token")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var token = await _authService.Authenticate(loginModel.Username, loginModel.Password);
            return new JsonResult(token);
        }

        [HttpPost("spotify")]
        public async Task<IActionResult> Spotify([FromBody] SpotifyAuthRequest loginModel)
        {
            var user = _usersService.GetCurrentUser();
            var accessToken = await _spotifyApiDataProvider.Authentificate(loginModel);
            user.ConnectedServicesCredentials.SpotifyUserCredentials = accessToken;
            _usersService.Update(user.Id, user);
            return new OkResult();
        }

        // [AllowAnonymous]
        // [HttpPost("google")]
        // public async Task<IActionResult> Google([FromBody] UserView userView)
        // {
        //     try
        //     {
        //         var payload = GoogleJsonWebSignature
        //             .ValidateAsync(userView.tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
        //         var token = await _authService.Authenticate(payload);
        //         return new JsonResult(token);
        //     }
        //     catch (Exception ex)
        //     {
        //         return new BadRequestResult();
        //     }
        // }
    }
}