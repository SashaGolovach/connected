using System.Security.Claims;
using System.Threading.Tasks;
using Connected.Models;
using Microsoft.AspNetCore.Http;

namespace Connected.Middleware
{
    public class AuthTokenMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthTokenMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task InvokeAsync(HttpContext context, IClientAuthorizationData clientAuthorizationData)
        {
            var claimsIdentity = context.User.Identity as ClaimsIdentity;
            var userId = claimsIdentity?.FindFirst(ClaimTypes.Name);
            clientAuthorizationData.UserId = userId?.Value;
            await _next.Invoke(context);
        }
    }
}