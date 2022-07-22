using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using backend.Models;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace backend.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProjectController(IConfiguration configuration)
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

       /* select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
left outer join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 4*/

[Route("api/asi/projects")]
        [HttpGet]
        [Authorize(Roles = "Student, StudentAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetProjects()
        {
            var currentUser = GetCurrentUser();

            string query = @" 
SELECT id_module, code, module.name as module_name,asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, module.module_group, module.ects, module_group.initials as module_group_initials,asi_user.id_asi_user as responsible, asi_user.name as responsible_name, asi_user.surname as responsible_surname, STRING_AGG(asi_module_semester.semester,',')  WITHIN GROUP ( ORDER BY asi_module_semester.id_asi_module_semester ASC)  AS semester FROM dbo.asi_module
left outer join asi_module_semester on asi_module_semester.asi_module = asi_module.id_asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join module_group on module.module_group = module_group.id_module_group
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi on asi.id_asi = asi_module_group.asi
where asi.asi_user =  @UserId AND module.module_group = 4 AND asi_module.expired is null
GROUP BY asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, id_module, code, module.name, module.module_group, module.ects,module_group.initials, asi_user.name, asi_user.surname, asi_user.id_asi_user
ORDER BY asi_module.id_asi_module asc
                           ";
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
    }
}
