using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using backend.Models;
using Microsoft.Extensions.Configuration;
using System;

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
        [HttpGet("api/asi/{id}")]
        public JsonResult GetAsi(int id)
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
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
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asi/ftp/{id}")]
        public JsonResult GetAsiFtp(int id)
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
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
        public JsonResult GetAsiTsm(int id)
        {
            string query = @" 
                            select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
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
        public JsonResult GetCm(int id)
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
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

        [HttpGet("api/asi/supplementaryModules/{id}")]
        public JsonResult GetSupplementaryModules(int id)
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
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
        public JsonResult GetMasterProject(int id)
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , site.name as site, site.initials as site_initials
from dbo.module
inner join asi_module on module.id_module = asi_module.module
inner join asi_user on module.responsible = asi_user.id_asi_user
inner join asi_module_group on asi_module.asi_module_group = asi_module_group.id_asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join module_group on module.module_group = module_group.id_module_group
inner join site on module.site = site.id_site
where asi.asi_user = @UserId AND module.module_group = 6
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
    }
}
