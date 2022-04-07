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
    public class ModuleController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public ModuleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]")]
        [HttpGet]
        public JsonResult GetCourses()
        {
            string query = @" 
                             select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module 
                            inner join asi_user on asi_user.id_asi_user = module.responsible
                            inner join site on module.site = site.id_site
							inner join module_group on module.module_group = module_group.id_module_group

                            where not module.module_group = 4 & 5;
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

        [Route("api/ftp")]
        [HttpGet]
        public JsonResult GetFtp()
        {
            string query = @" 
 select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             inner join asi_user on asi_user.id_asi_user = module.responsible
                            inner join site on module.site = site.id_site
							inner join module_group on module.module_group = module_group.id_module_group

                            where module.module_group = 1;
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
        public JsonResult GetTsm()
        {
            string query = @" 
 select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             inner join asi_user on asi_user.id_asi_user = module.responsible
                            inner join site on module.site = site.id_site
							inner join module_group on module.module_group = module_group.id_module_group

                            where module.module_group = 2;
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
        public JsonResult GetCm()
        {
            string query = @" 
 select id_module, code, module.name as module_name, module_group.initials as module_group_initials, ects, asi_user.name as responsible_name, asi_user.surname as responsible_surname ,site.name as site, site.initials as site_initials from dbo.module                             inner join asi_user on asi_user.id_asi_user = module.responsible
                            inner join site on module.site = site.id_site
							inner join module_group on module.module_group = module_group.id_module_group

                            where module.module_group = 3;
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
    }

}
