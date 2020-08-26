using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public UserController(IClientAuthorizationData clientAuthorizationData, IUsersService usersService,
            IMapper mapper)
        {
            _clientAuthorizationData = clientAuthorizationData;
            _usersService = usersService;
            _mapper = mapper;
        }

        [HttpGet("me")]
        public ActionResult GetCurrentUser()
        {
            var currentUser = _usersService.GetUserById(_clientAuthorizationData.UserId);
            var userView = _mapper.Map<UserView>(currentUser);
            return new JsonResult(userView);
        }

        [HttpGet("")]
        public IEnumerable<UserView> GetUsers()
        {
            var users = _usersService.GetUsers(user => user.Id != _clientAuthorizationData.UserId);
            var userViews = _mapper.Map<IEnumerable<UserView>>(users);
            return userViews;
        }
    }
}