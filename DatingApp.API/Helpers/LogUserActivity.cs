using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Waiting until an Action is completed
           var resultContext = await next();

           var userId = int.Parse(resultContext.HttpContext.User
           .FindFirst(ClaimTypes.NameIdentifier).Value);

            // Getting an instance of Dating Repository Interface
           var repo = resultContext.HttpContext.RequestServices.GetService<iDatingRepository>();

           var user = await repo.GetUser(userId);
           user.LastActive = DateTime.Now;
           await repo.SaveAll();
        

        }
    }
}