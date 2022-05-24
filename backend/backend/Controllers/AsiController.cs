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
    public class AsiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AsiController(IConfiguration configuration)
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

        [HttpGet("api/asi")]
        [Authorize(Roles = "Student")]

        public JsonResult GetAsi()
        {

            var currentUser = GetCurrentUser();

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId
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

            return new JsonResult(query);
        }




        [HttpGet("api/asi/moduleGroups")]
        [Authorize(Roles = "Student")]
        public JsonResult GetModuleGroups()
        {
            var currentUser = GetCurrentUser();



            string query = @" 

select asi_module_group.id_asi_module_group, asi_module_group.asi, asi_module_group.module_group, asi_user.name, asi_user.surname, asi_user.id_asi_user from dbo.asi_module_group
inner join asi on asi_module_group.asi = asi.id_asi
inner join asi_user on asi_user.id_asi_user = asi.asi_user
where asi_user.id_asi_user = @AsiUserId AND asi.created_at = ( select max(created_at) from asi where asi.asi_user = asi_user.id_asi_user)  
                              ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@AsiUserId", currentUser.AsiUserId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost("api/asi")]
        [Authorize(Roles = "Student")]
        public JsonResult addModules(Asi asi)
        {

            string cmAsiModuleGroupId = "";
            string ftpAsiModuleGroupId = "";
            string tsmAsiModuleGroupId = "";

            // save asi module group id and create module group id pool

            for (int i=0; i< asi.moduleGroups.Length; i++)
            {
                switch (asi.moduleGroups[i].module_group)
                {
                    case 1:
                        ftpAsiModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                    case 2:
                        tsmAsiModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                    case 3:
                        cmAsiModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                }
            }

            // create pool of cm modules
            string listOfCmModules = "";
            for (int i = 0; i < asi.cmAsiModules.Length; i++)
            {
                listOfCmModules += "(" + cmAsiModuleGroupId + "," + asi.cmAsiModules[i].id_module + "," + asi.cmAsiModules[i].semester + "," + "1)";
                if (i != asi.cmAsiModules.Length - 1)
                {
                    listOfCmModules += ",";
                }
            }

            // create pool of tsm modules
            string listOfTsmModules = "";
            for (int i = 0; i < asi.tsmAsiModules.Length; i++)
            {
                listOfTsmModules += "(" + tsmAsiModuleGroupId + "," + asi.tsmAsiModules[i].id_module + "," + asi.tsmAsiModules[i].semester + "," + "1)";
                if (i != asi.tsmAsiModules.Length - 1)
                {
                    listOfTsmModules += ",";
                }
            }

            if (asi.tsmAsiModules.Length != 0)
            {
                listOfTsmModules += ",";
            }

            // create pool of ftp modules
            string listOfftpModules = "";
            for (int i = 0; i < asi.ftpAsiModules.Length; i++)
            {
                listOfftpModules += "(" + ftpAsiModuleGroupId + "," + asi.ftpAsiModules[i].id_module + "," + asi.ftpAsiModules[i].semester + "," + "1)";
                if (i != asi.ftpAsiModules.Length - 1)
                {
                    listOfftpModules += ",";
                }
            }

            if (asi.ftpAsiModules.Length != 0)
            {
                listOfftpModules += ",";
            }

            string query = @"delete from dbo.asi_module where asi_module.asi_module_group in (" + cmAsiModuleGroupId + "," + ftpAsiModuleGroupId + "," + tsmAsiModuleGroupId + ");";
            if (asi.ftpAsiModules.Length != 0 | asi.tsmAsiModules.Length != 0 | asi.cmAsiModules.Length != 0)
                query += "insert into dbo.asi_module (asi_module_group, module, semester, asi_module_state ) values " + listOfftpModules + listOfTsmModules + listOfCmModules;


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;

            Console.WriteLine(query);

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost("api/asiTechicalModules")]
        [Authorize(Roles = "Student")]
        public JsonResult addTechnicalModules(Asi asi)
        {
            Console.WriteLine(asi);

            // il problema è che i progetti e il master project essendo progetti non hanno un id_module e va inserito il modulo

            string projectModuleGroupId = "";
            string supplementaryModuleGroupId = "";
            string masterModuleGroupId = "";

            // save asi module group id and create module group id pool
            for (int i = 0; i < asi.moduleGroups.Length; i++)
            {
                switch (asi.moduleGroups[i].module_group)
                {

                    case 4:
                        projectModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                    case 5:
                        supplementaryModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                    case 6:
                        masterModuleGroupId += asi.moduleGroups[i].id_asi_module_group;
                        break;
                   
                }
            }

            string query = @"";
            query += "delete from dbo.asi_module where asi_module.asi_module_group in (" + projectModuleGroupId + "," + supplementaryModuleGroupId + "," + masterModuleGroupId + ");";


            // progetti nuovi
            for (int i = 0; i < asi.projectAsiModules.Length; i++)
            {
                if (asi.projectAsiModules[i].id_module == -1)
                {
                    query += "INSERT INTO dbo.module(code, name, ects, site,  responsible, module_group  ) VALUES ('" + asi.projectAsiModules[i].code + "','"+ asi.projectAsiModules[i].module_name + "',"+ asi.projectAsiModules[i].ects + ", 1,"+asi.projectAsiModules[i].responsible + ", 4);";
                    query += "INSERT INTO dbo.asi_module (asi_module_group, module,  asi_module_state ) values (" + projectModuleGroupId + ", (SELECT @@IDENTITY AS ID), "+ "1);";
                    
                } else
                {
                    query += "INSERT INTO dbo.asi_module (asi_module_group, module, asi_module_state ) values (" + projectModuleGroupId + ", " + asi.projectAsiModules[i].id_module + "," + "1);";
                    query += "UPDATE dbo.module SET responsible = " + asi.projectAsiModules[i].responsible + " WHERE module.id_module = " + asi.projectAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET code = '" + asi.projectAsiModules[i].code + "' WHERE module.id_module = " + asi.projectAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET name = '" + asi.projectAsiModules[i].module_name + "' WHERE module.id_module = " + asi.projectAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET ects = " + asi.projectAsiModules[i].ects + " WHERE module.id_module = " + asi.projectAsiModules[i].id_module + ";";



                }

                if (i == 0)
                {
                    query += "INSERT INTO dbo.asi_module_semester(semester, asi_module) VALUES ";
                    for (int j = 0; j < asi.projectAsiModules[i].firstProjectValues.Length; j++)
                    {
                        query += "(" + asi.projectAsiModules[i].firstProjectValues[j] + ",(SELECT @@IDENTITY AS ID)" + ")";
                        if (j != asi.projectAsiModules[i].firstProjectValues.Length - 1)
                            query += ",";
                        else
                            query += ";";
                    }
                }
                else if (i == 1)
                {
                    query += "INSERT INTO dbo.asi_module_semester(semester, asi_module) VALUES ";
                    for (int j = 0; j < asi.projectAsiModules[i].secondProjectValues.Length; j++)
                    {
                        query += "(" + asi.projectAsiModules[i].secondProjectValues[j] + ",(SELECT @@IDENTITY AS ID)" + ")";
                        if (j != asi.projectAsiModules[i].secondProjectValues.Length - 1)
                            query += ",";
                        else
                            query += ";";
                    }
                }
            }

            // create pool of supplementary modules
            for (int i = 0; i < asi.supplementaryAsiModules.Length; i++)
            {
                query += "INSERT INTO dbo.asi_module (asi_module_group, module, semester, asi_module_state ) values (" + supplementaryModuleGroupId + "," + asi.supplementaryAsiModules[i].id_module + "," + asi.supplementaryAsiModules[i].semester + "," + "1);";
                // alter table modify responsible
            }


            // create pool of master modules
            for (int i = 0; i < asi.masterAsiModules.Length; i++)
            {
                if (asi.masterAsiModules[i].id_module == -1)
                {
                    query += "INSERT INTO dbo.module(code, name, ects, site, responsible, module_group  ) VALUES ('" + asi.masterAsiModules[i].code + "','" + asi.masterAsiModules[i].module_name + "'," + asi.masterAsiModules[i].ects + ", 1," + asi.masterAsiModules[i].responsible + ",6);";
                    query += "INSERT INTO dbo.asi_module (asi_module_group, module,  asi_module_state ) values (" + masterModuleGroupId + ", (SELECT @@IDENTITY AS ID), " +  "1);";
                } else
                {
                    query += "INSERT INTO dbo.asi_module (asi_module_group, module, asi_module_state ) values (" + masterModuleGroupId + "," + asi.masterAsiModules[i].id_module + "," +  "1);";
                    query += "UPDATE dbo.module SET responsible = " + asi.masterAsiModules[i].responsible + " WHERE module.id_module = " + asi.masterAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET code = '" + asi.masterAsiModules[i].code + "' WHERE module.id_module = " + asi.masterAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET name = '" + asi.masterAsiModules[i].module_name + "' WHERE module.id_module = " + asi.masterAsiModules[i].id_module + ";";
                    query += "UPDATE dbo.module SET ects = " + asi.masterAsiModules[i].ects + " WHERE module.id_module = " + asi.masterAsiModules[i].id_module + ";";
                }

                if (i == 0)
                {
                    query += "INSERT INTO dbo.asi_module_semester(semester, asi_module) VALUES ";
                    for (int j = 0; j < asi.masterAsiModules[i].masterProjectValues.Length; j++)
                    {
                        query += "(" + asi.masterAsiModules[i].masterProjectValues[j] + ",(SELECT @@IDENTITY AS ID)" + ")";
                        if (j != asi.masterAsiModules[i].masterProjectValues.Length - 1)
                            query += ",";
                        else
                            query += ";";
                    }
                }
                
            }


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(query);
        }

        [HttpGet("api/asi/ftp/{id}")]
        [Authorize(Roles = "Advisor,StudentAdvisor")]
        public JsonResult GetAsiStudentFtp(int id)
        {

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
                             from dbo.module
                             inner join asi_module on module.id_module = asi_module.module
                             inner join asi_user on module.responsible = asi_user.id_asi_user
                             inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
                             inner join asi on asi.id_asi = asi_module_group.asi
                             inner join module_group on module.module_group = module_group.id_module_group
                             inner join site on module.site = site.id_site
                             where asi.asi_user = @UserId AND module.module_group = 1
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/tsm/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAsiStudentTsm(int id)
        {

            string query = @" 
                            select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
                            from dbo.module
                            inner join asi_module on module.id_module = asi_module.module
                            inner join asi_user on module.responsible = asi_user.id_asi_user
                            inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
                            inner join asi on asi.id_asi = asi_module_group.asi
                            inner join module_group on module.module_group = module_group.id_module_group
                            inner join site on module.site = site.id_site
                            where asi.asi_user = @UserId AND module.module_group = 2
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/cm/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAsiStudentCm(int id)
        {

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
                             from dbo.module
                             inner join asi_module on module.id_module = asi_module.module
                             inner join asi_user on module.responsible = asi_user.id_asi_user
                             inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
                             inner join asi on asi.id_asi = asi_module_group.asi
                             inner join module_group on module.module_group = module_group.id_module_group
                             inner join site on module.site = site.id_site
                             where asi.asi_user = @UserId AND module.module_group = 3
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/projects/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAsiStudentProjects(int id)
        {

            string query = @" 
SELECT id_module, code, module.name as module_name, asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, module.module_group, module.ects, site.name as site, site.initials as site_initials, module_group.initials as module_group_initials,asi_user.id_asi_user as responsible, asi_user.name as responsible_name, asi_user.surname as responsible_surname, STRING_AGG(asi_module_semester.semester,',')  WITHIN GROUP(ORDER BY asi_module_semester.id_asi_module_semester ASC)  AS semester FROM dbo.asi_module
left outer join asi_module_semester on asi_module_semester.asi_module = asi_module.id_asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join module_group on module.module_group = module_group.id_module_group
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi on asi.id_asi = asi_module_group.asi
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 4
GROUP BY asi_module.id_asi_module, asi_module.module, asi_module.asi_module_state, asi_module.asi_module_group, id_module, code, module.name, module.module_group, module.ects, module_group.initials, asi_user.name, asi_user.surname, asi_user.id_asi_user, site.name, site.initials
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/supplementaryModules/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAsiStudentSupplementaryModules(int id)
        {

            string query = @" 
SELECT id_module, code, module.name as module_name, asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, module.module_group, module.ects, site.name as site, site.initials as site_initials, module_group.initials as module_group_initials,asi_user.id_asi_user as responsible, asi_user.name as responsible_name, asi_user.surname as responsible_surname, STRING_AGG(asi_module_semester.semester,',')  WITHIN GROUP(ORDER BY asi_module_semester.id_asi_module_semester ASC)  AS semester FROM dbo.asi_module
left outer join asi_module_semester on asi_module_semester.asi_module = asi_module.id_asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join module_group on module.module_group = module_group.id_module_group
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi on asi.id_asi = asi_module_group.asi
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 5
GROUP BY asi_module.id_asi_module, asi_module.module, asi_module.asi_module_state, asi_module.asi_module_group, id_module, code, module.name, module.module_group, module.ects, module_group.initials, asi_user.name, asi_user.surname, asi_user.id_asi_user, site.name, site.initials
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/masterProject/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAsiStudentMasterProject(int id)
        {

            string query = @" 
SELECT id_module, code, module.name as module_name, asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, module.module_group, module.ects, site.name as site, site.initials as site_initials, module_group.initials as module_group_initials,asi_user.id_asi_user as responsible, asi_user.name as responsible_name, asi_user.surname as responsible_surname, STRING_AGG(asi_module_semester.semester,',')  WITHIN GROUP(ORDER BY asi_module_semester.id_asi_module_semester ASC)  AS semester FROM dbo.asi_module
left outer join asi_module_semester on asi_module_semester.asi_module = asi_module.id_asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join module_group on module.module_group = module_group.id_module_group
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi on asi.id_asi = asi_module_group.asi
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 6
GROUP BY asi_module.id_asi_module, asi_module.module, asi_module.asi_module_state, asi_module.asi_module_group, id_module, code, module.name, module.module_group, module.ects, module_group.initials, asi_user.name, asi_user.surname, asi_user.id_asi_user, site.name, site.initials
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("api/asi/ftp")]
        [Authorize(Roles = "Student")]
        public JsonResult GetAsiFtp()
        {

            var currentUser = GetCurrentUser();

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 1
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

        [HttpGet("api/asi/tsm")]
        [Authorize(Roles = "Student")]
        public JsonResult GetAsiTsm()
        {
            var currentUser = GetCurrentUser();

            string query = @" 
                            select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 2
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

        [HttpGet("api/asi/cm")]
        [Authorize(Roles = "Student")]
        public JsonResult GetCm()
        {
            var currentUser = GetCurrentUser();

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 3
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

        [HttpGet("api/asi/supplementaryModules")]
        [Authorize(Roles = "Student")]
        public JsonResult GetSupplementaryModules()
        {
            var currentUser = GetCurrentUser();

            string query = @" 
                             select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 5
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



      [HttpGet("api/asi/masterProject")]
        [Authorize(Roles = "Student")]
        public JsonResult GetMasterProject()
        {
            var currentUser = GetCurrentUser();

            string query = @" 
SELECT id_module, code, module.name as module_name,asi_module.id_asi_module,asi_module.module,asi_module.asi_module_state,asi_module.asi_module_group, module.module_group, module.ects, module_group.initials as module_group_initials,asi_user.id_asi_user as responsible, asi_user.name as responsible_name, asi_user.surname as responsible_surname, STRING_AGG(asi_module_semester.semester,',')  WITHIN GROUP(ORDER BY asi_module_semester.id_asi_module_semester ASC)  AS semester FROM dbo.asi_module
left outer join asi_module_semester on asi_module_semester.asi_module = asi_module.id_asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join module_group on module.module_group = module_group.id_module_group
left outer join asi_user on module.responsible = asi_user.id_asi_user
inner join asi on asi.id_asi = asi_module_group.asi
where asi.asi_user = @UserId AND module.module_group = 6
GROUP BY asi_module.id_asi_module, asi_module.module, asi_module.asi_module_state, asi_module.asi_module_group, id_module, code, module.name, module.module_group, module.ects, module_group.initials, asi_user.name, asi_user.surname, asi_user.id_asi_user
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


       /* [HttpGet("api/advisorStudents/{id}/ftp")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAdvisorStudentFtp(int id)
        {
            string query = @" 
                select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 1
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }*/

      /*  [HttpGet("api/advisorStudents/{id}/tsm")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAdvisorStudentTsm(int id)
        {
            string query = @" 
                select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 2
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }*/

       /* [HttpGet("api/advisorStudents/{id}/cm")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAdvisorStudentCm(int id)
        {
            string query = @" 
                select asi_module.id_asi_module, asi_module.asi_module_group, asi_module.asi_module_state,  id_module, code, module.name as module_name, module_group.initials as module_group_initials, module_group.id_module_group as module_group_id, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 3
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }*/
    }
}
