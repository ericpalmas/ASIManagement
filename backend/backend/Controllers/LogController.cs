using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using backend.Models;
using Microsoft.Extensions.Configuration;
using System;

//using JwtApp.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace backend.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LogController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private AsiUser GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                Console.WriteLine(userClaims.ToString());

                return new AsiUser
                {
                    AsiUserId = Convert.ToInt32(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value),
                    AsiUserName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    AsiUserSurname = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Surname)?.Value,
                    AsiUserEmail = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
                };
            }
            return null;
        }
        [HttpGet("api/logs")]
        [Authorize(Roles = "Administrator")]
        public JsonResult GetAsiState()
        {
           //var currentUser = GetCurrentUser();

            string query = @"select log.code, log.module_name, log.semester, log.ects, action.id_action, action.name as action_name, field.id_field, field.name as field_name, log.old_value, log.new_value, asi_user.name as student_name ,asi_user.surname as student_surname, adv.name as advisor_name,adv.surname as advisor_surname, log.date from dbo.log
left outer join action on log.action = action.id_action
left outer join field on log.field = field.id_field
left outer join asi on asi.id_asi = log.asi
left outer join asi_user on asi_user.id_asi_user = asi.asi_user
left outer join asi_user as adv on asi_user.advisor = adv.id_asi_user";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                Console.WriteLine("SQL connection");
                Console.WriteLine(myCon);
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    //myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/advisorlogs")]
        [Authorize(Roles = "Advisor, StudentAdvisor, ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetAdvisorState()
        {
            var currentUser = GetCurrentUser();

            string query = @"    select log.code, log.module_name, log.semester, log.ects, action.id_action, action.name as action_name, field.id_field, field.name as field_name, log.old_value, log.new_value, asi_user.name as student_name , asi_user.surname as student_surname, adv.name as advisor_name, adv.surname as advisor_surname, log.date from dbo.log
left outer join action on log.action = action.id_action
left outer join field on log.field = field.id_field
left outer join asi on asi.id_asi = log.asi
left outer join asi_user on asi_user.id_asi_user = asi.asi_user
left outer join asi_user as adv on asi_user.advisor = adv.id_asi_user
where adv.id_asi_user = @UserId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                Console.WriteLine("SQL connection");
                Console.WriteLine(myCon);
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("api/profileresponsiblelogs")]
        [Authorize(Roles = "ProfileResponsible, ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetResponsibleProfileState()
        {
            var currentUser = GetCurrentUser();

            string query = @"
select log.code, log.module_name, log.semester, log.ects, action.id_action, action.name as action_name, field.id_field, field.name as field_name, log.old_value, log.new_value, asi_user.name as student_name , asi_user.surname as student_surname, adv.name as advisor_name, adv.surname as advisor_surname, log.date from dbo.log
left outer join action on log.action = action.id_action
left outer join field on log.field = field.id_field
left outer join asi on asi.id_asi = log.asi
left outer join asi_user on asi_user.id_asi_user = asi.asi_user
left outer join asi_user as adv on asi_user.advisor = adv.id_asi_user
where asi_user.profile in (select asi_user.profile from asi_user  where asi_user.id_asi_user = @UserId)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                Console.WriteLine("SQL connection");
                Console.WriteLine(myCon);
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
             

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost("api/logs")]
        [Authorize(Roles = "Student, StudentAdvisor, Advisor, Administrator,ProfileResponsibleStudentAdvisor, ProfileResponsible, ProfileResponsibleAdvisor")]
        public JsonResult addLog(Logs logs)
        {

            var currentUser = GetCurrentUser();

            string query = @"";

            for (int i = 0; i < logs.logs.Length; i++)
            {
                switch (logs.logs[i].action)
                {
                    case 1:
                        query += "INSERT INTO dbo.log (date, action, code, module_name, semester, ects, asi) VALUES(GETDATE()," + logs.logs[i].action + ",'" + logs.logs[i].code + "','"+ logs.logs[i].module_name + "','" + logs.logs[i].semester + "'," + logs.logs[i].ects + ",(select asi.id_asi from asi where asi.asi_user = @UserId));";
                        break;
                    case 2:
                        query += "INSERT INTO dbo.log (date, action, code, module_name, semester, ects, asi) VALUES(GETDATE()," + logs.logs[i].action + ",'" + logs.logs[i].code + "','" + logs.logs[i].module_name + "','" + logs.logs[i].semester + "'," + logs.logs[i].ects + ",(select asi.id_asi from asi where asi.asi_user = @UserId));";
                        break;
                    case 3:
                        query += "INSERT INTO dbo.log (date, action, code, module_name, semester, ects, asi, field, old_value, new_value) VALUES(GETDATE()," + logs.logs[i].action + ",'" + logs.logs[i].code + "','" + logs.logs[i].module_name + "','" + logs.logs[i].semester + "'," + logs.logs[i].ects + ",(select asi.id_asi from asi where asi.asi_user = @UserId)," + logs.logs[i].field + ",'"+ logs.logs[i].old_value + "','"+ logs.logs[i].new_value + "');";
                        break;

                }
            }


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;

            Console.WriteLine(query);

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost("api/advisorlogs")]
        [Authorize(Roles = "Student, StudentAdvisor, Advisor, Administrator,ProfileResponsibleStudentAdvisor, ProfileResponsible, ProfileResponsibleAdvisor")]
        public JsonResult addAdvisorLog(Logs logs)
        {

            var currentUser = GetCurrentUser();

            string query = @"";

            for (int i = 0; i < logs.logs.Length; i++)
            {
                switch (logs.logs[i].action)
                {
              
                    case 4:
                        query += "INSERT INTO dbo.log (date, action, asi, advisor) VALUES(GETDATE()," + logs.logs[i].action + ",(select asi.id_asi from asi where asi.asi_user = " + logs.logs[i].AsiUser + "),@UserId);";
                        break;
                    case 5:
                        query += "INSERT INTO dbo.log (date, action, asi, advisor) VALUES(GETDATE()," + logs.logs[i].action + ",(select asi.id_asi from asi where asi.asi_user = " + logs.logs[i].AsiUser + "),@UserId);";
                        break;
                }
            }


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;

            Console.WriteLine(query);

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost("api/profileresponsiblelogs")]
        [Authorize(Roles = "Student, StudentAdvisor, Advisor, Administrator,ProfileResponsibleStudentAdvisor, ProfileResponsible, ProfileResponsibleAdvisor")]
        public JsonResult addProfileResponsibleLog(Logs logs)
        {

            var currentUser = GetCurrentUser();

            string query = @"";

            for (int i = 0; i < logs.logs.Length; i++)
            {
                switch (logs.logs[i].action)
                {

                    case 4:
                        query += "INSERT INTO dbo.log (date, action, asi, profile_responsible) VALUES(GETDATE()," + logs.logs[i].action + ",(select asi.id_asi from asi where asi.asi_user = " + logs.logs[i].AsiUser + "),@UserId);";
                        break;
                    case 5:
                        query += "INSERT INTO dbo.log (date, action, asi,  profile_responsible) VALUES(GETDATE()," + logs.logs[i].action + ",(select asi.id_asi from asi where asi.asi_user = " + logs.logs[i].AsiUser + "),@UserId);";
                        break;
                }
            }


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;

            Console.WriteLine(query);

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
