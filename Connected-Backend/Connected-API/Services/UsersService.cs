using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using Connected.Models;
using MongoDB.Driver;
using MongoDatabaseSettings = Connected.Models.MongoDatabaseSettings;

namespace Connected.Services
{
    public class UsersService : IUsersService
    {
        private readonly IMongoCollection<User> _usersDatabase;
        private readonly IClientAuthorizationData _clientAuthorizationData;

        public UsersService(MongoDatabaseSettings settings, IClientAuthorizationData clientAuthorizationData)
        {
            _clientAuthorizationData = clientAuthorizationData;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _usersDatabase = database.GetCollection<User>("users");
        }

        public IEnumerable<User> GetUsers(Expression<Func<User, bool>> filter) =>
            _usersDatabase.Find(filter).ToList();

        public User GetByUsername(string username) =>
            _usersDatabase.Find<User>(user => user.Username == username).FirstOrDefault()
            ?? throw new HttpException((int) HttpStatusCode.NotFound, "User not found");

        public User Create(User user)
        {
            _usersDatabase.InsertOne(user);
            return user;
        }

        public User GetCurrentUser()
        {
            return GetUserById(_clientAuthorizationData.UserId);
        }

        public void Update(string id, User user) =>
            _usersDatabase.ReplaceOne(u => u.Id == id, user);

        public void Remove(User user) =>
            _usersDatabase.DeleteOne(u => u.Id == user.Id);

        public void Remove(string id) =>
            _usersDatabase.DeleteOne(u => u.Id == id);

        public User GetUserById(string userId) =>
            _usersDatabase.Find(user => user.Id == userId).FirstOrDefault()
            ?? throw new HttpException((int) HttpStatusCode.NotFound, "User not found");
    }
}