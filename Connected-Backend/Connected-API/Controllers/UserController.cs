using System.Security.Claims;
using Connected.Models;
using Connected.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Connected.Controllers
{
    [Route("users")]
    [Authorize]
    public class UserController
    {
        private readonly IClientAuthorizationData _clientAuthorizationData;
        private readonly IUsersService _usersService;

        public UserController(IClientAuthorizationData clientAuthorizationData, IUsersService usersService)
        {
            _clientAuthorizationData = clientAuthorizationData;
            _usersService = usersService;
        }

        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
           var currentUser = _usersService.GetUserById(_clientAuthorizationData.UserId);
           return new JsonResult(currentUser);
        }
        
        [HttpGet("")]
        public IActionResult GetUsers()
        {
            var users = _usersService.GetUsers(user => user.Id != _clientAuthorizationData.UserId);
            return new JsonResult(users);
        }
        
        [HttpPost("")]
        [AllowAnonymous]
        public IActionResult CreateUser(User user)
        {
            _usersService.Create(user);
            return new OkResult();
        }
    }
}