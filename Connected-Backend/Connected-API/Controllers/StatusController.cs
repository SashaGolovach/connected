using Microsoft.AspNetCore.Mvc;

namespace Connected.Controllers
{
    [Route("status")]
    public class StatusController
    {
        [HttpGet("")]
        public ActionResult GetCurrentUser()
        {
            var status = new
            {
                Status = "Ok",
                DatabaseStatus = "Ok",
                MySqlConnected = "False"
            };
            return new JsonResult(status);
        }
    }
}