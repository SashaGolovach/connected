using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Connected.DataProviders;
using Connected.Models;
using Connected.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Connected.Controllers
{
    [Route("match")]
    [Authorize]
    public class MatchingController
    {
        private readonly IClientAuthorizationData _clientAuthorizationData;
        private readonly ISpotifyDataProvider _spotifyApiDataProvider;
        private readonly IUsersService _usersService;
        private readonly IMapper _mapper;

        public MatchingController(IMapper mapper, IUsersService usersService, IClientAuthorizationData clientAuthorizationData, ISpotifyDataProvider spotifyApiDataProvider)
        {
            _mapper = mapper;
            _usersService = usersService;
            _clientAuthorizationData = clientAuthorizationData;
            _spotifyApiDataProvider = spotifyApiDataProvider;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> MatchUser(string userId)
        {
            var currentUser = _usersService.GetUserById(_clientAuthorizationData.UserId);
            var matchingUser = _usersService.GetUserById(userId);
            var response = new MatchUsersResponse
            {
                Score = 50
            };
            try
            {
                var myTracks = (await _spotifyApiDataProvider.GetUserTracks(currentUser.Id)).ToArray();
                var userTracks = (await _spotifyApiDataProvider.GetUserTracks(matchingUser.Id)).ToArray();
                var commonTracks = myTracks.Intersect(userTracks).ToArray();
                response.Score = commonTracks.Length / (myTracks.Length + userTracks.Length);
            }
            catch (Exception e)
            {
                // ignored
            }

            return new JsonResult(response);
        }

    }
}