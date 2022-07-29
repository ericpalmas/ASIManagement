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

namespace backend.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class ModuleController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ModuleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]")]
        [HttpGet]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor ")]
        public JsonResult GetCourses()
        {
            string query = @" 
               select id_module, code, module_profile.name as module_profile,module_profile.initials as module_profile_initials, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module 
               inner join asi_user on asi_user.id_asi_user = module.responsible
               inner join site on module.site = site.id_site
               inner join module_group on module.module_group = module_group.id_module_group
               left outer join module_profile on module_profile.id_module_profile = module.module_profile
               where not module.module_group = 4 AND not module.module_group = 6 AND module.expired is null
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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpDelete("api/module/{id}")]
        [Authorize(Roles = "Administrator")]
        public JsonResult DeleteModule(int id)
        {
            string query = "UPDATE dbo.module SET module.expired = GETDATE() WHERE module.id_module = @ModuleId;";

            query += "UPDATE dbo.calendar_module SET calendar_module.expired = GETDATE() WHERE calendar_module.module = @ModuleId;";

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
                    myCommand.Parameters.AddWithValue("@ModuleId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/module")]
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public JsonResult RegisterModule(Module request)
        {
            
            string query = @"DECLARE @MODULE_ID int;";

            query += "INSERT INTO dbo.module(code, name, description, ects, site, responsible, module_profile, module_group ) VALUES ('"+ request.code + "', '" + request.name + "', '" + request.description + "', " + request.ects + ", " + request.site + ", " + request.responsible + ", " + request.module_profile + ", " + request.module_group + ");";

            query += "SELECT @MODULE_ID = SCOPE_IDENTITY();";

            for (int i=0; i < request.moduleCalendar.Length; i++)
            {
                query += "INSERT INTO dbo.calendar_module(start_year, end_year, fall_semester, spring_semester, spring_enough_sub, fall_enough_sub, module) VALUES ( " + request.moduleCalendar[i].start_year + "," + request.moduleCalendar[i].end_year + ", " + request.moduleCalendar[i].fall_semester + ", " + request.moduleCalendar[i].spring_semester + ", " + request.moduleCalendar[i].spring_enough_sub + ", " + request.moduleCalendar[i].fall_enough_sub + ", @MODULE_ID);";
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

            return new JsonResult(table);
        }

        [Route("api/moduleGroups")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public JsonResult GetModuleGroups()
        {
            string query = @" 
               select * from module_group
               where module_group.expired is null;";

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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/moduleProfiles")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public JsonResult GetModuleProfiles()
        {
            string query = @" 
               select * from dbo.module_profile
               where module_profile.expired is null";

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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/sites")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public JsonResult GetSites()
        {
            string query = @" 
                 select * from site
                 where site.expired is null;";

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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/ftp")]
        [HttpGet]
        [Authorize(Roles = "Student, Advisor, StudentAdvisor, Administrator")]
        public JsonResult GetFtp()
        {
            string query = @" 
                select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             inner join asi_user on asi_user.id_asi_user = module.responsible
                inner join site on module.site = site.id_site
			    inner join module_group on module.module_group = module_group.id_module_group
                where module.module_group = 1 AND module.expired is null;
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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/tsm")]
        [HttpGet]
        [Authorize(Roles = "Student,Advisor, StudentAdvisor, Administrator")]
        public JsonResult GetTsm()
        {
            string query = @" 
                 select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             
                 inner join asi_user on asi_user.id_asi_user = module.responsible
                 inner join site on module.site = site.id_site
				 inner join module_group on module.module_group = module_group.id_module_group
                 where module.module_group = 2 AND module.expired is null;
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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/cm")]
        [HttpGet]
        [Authorize(Roles = "Student,Advisor, StudentAdvisor, Administrator")]
        public JsonResult GetCm()
        {
            string query = @" 
                 select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             
                 inner join asi_user on asi_user.id_asi_user = module.responsible
                 inner join site on module.site = site.id_site
			     inner join module_group on module.module_group = module_group.id_module_group
                 where module.module_group = 3 AND module.expired is null;";

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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/supplementaryModules")]
        [HttpGet]
        [Authorize(Roles = "Student,Advisor, StudentAdvisor, Administrator")]
        public JsonResult GetSupplementaryModules()
        {
            string query = @" 
                select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             
                inner join asi_user on asi_user.id_asi_user = module.responsible
                inner join site on module.site = site.id_site
				inner join module_group on module.module_group = module_group.id_module_group
                where module.module_group = 5 AND module.expired is null;
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
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("api/moduleGroupRules")]
        [HttpGet]
        [Authorize(Roles = "Student,Advisor, StudentAdvisor, Administrator")]
        public JsonResult GetModuleGroupRules()
        {
            string query = @"select * from module_group_rules where module_group_rules.expired is null";

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
