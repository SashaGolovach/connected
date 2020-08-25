using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Connected.Models;

namespace Connected.Services
{
    public interface IUsersService
    {
        User GetUserById(string userId);
        User GetCurrentUser();
        void Update(string id, User user);
        User Create(User user);
        User GetByUsername(string username);
        IEnumerable<User> GetUsers(Expression<Func<User, bool>> filter);
    }
}