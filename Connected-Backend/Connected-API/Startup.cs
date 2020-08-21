using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Connected.DataProviders;
using Connected.Middleware;
using Connected.Models;
using Connected.Services;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Connected
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader();
                    });
            });
            var key = Encoding.ASCII.GetBytes(AppSettings.appSettings.JwtSecret);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            
            services.Configure<MongoDatabaseSettings>(
                Configuration.GetSection(nameof(MongoDatabaseSettings)));

            services.AddSingleton<MongoDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDatabaseSettings>>().Value);
            services.AddSingleton<AppSettings>(sp => AppSettings.appSettings);
            services.AddSingleton<IOAuthTokenProvider, OAuthTokenProvider>();

            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IClientAuthorizationData, ClientAuthorizationData>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<SpotifyApiDataProvider>();
            services.AddScoped<ISpotifyDataProvider, SpotifyDataProvider>();
            services.AddScoped<IHttpClientService<SpotifyApiDataProvider>, HttpClientService<SpotifyApiDataProvider>>();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<AuthTokenMiddleware>();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}