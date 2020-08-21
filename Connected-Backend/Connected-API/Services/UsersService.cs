using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Connected.Models;
using MongoDB.Driver;
using MongoDatabaseSettings = Connected.Models.MongoDatabaseSettings;

namespace Connected.Services
{
    public class UsersService : IUsersService
    {
        private readonly IMongoCollection<User> _usersDatabase;

        public UsersService(MongoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _usersDatabase = database.GetCollection<User>("users");
        }

        public IEnumerable<User> GetUsers(Expression<Func<User, bool>> filter) =>
            _usersDatabase.Find(filter).ToList();

        public User GetByUsername(string username) =>
            _usersDatabase.Find<User>(user => user.Username == username).FirstOrDefault();

        public User Create(User user)
        {
            _usersDatabase.InsertOne(user);
            return user;
        }

        public void Update(string id, User bookIn) =>
            _usersDatabase.ReplaceOne(book => book.Id == id, bookIn);

        public void Remove(User bookIn) =>
            _usersDatabase.DeleteOne(book => book.Id == bookIn.Id);

        public void Remove(string id) =>
            _usersDatabase.DeleteOne(book => book.Id == id);

        public User GetUserById(string userId) =>
            _usersDatabase.Find(user => user.Id == userId).FirstOrDefault();
    }
}