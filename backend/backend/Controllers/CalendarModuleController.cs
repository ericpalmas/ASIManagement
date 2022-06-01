using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using backend.Models;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class CalendarModuleController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public CalendarModuleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/calendarModule/years")]
        [HttpGet]
        [Authorize(Roles = "Student, StudentAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetModuleYears()
        {
            string query = @"select distinct(start_year), end_year from calendar_module;";
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

        [Route("api/calendarModule")]
        [HttpGet]
        [Authorize(Roles = "Student, StudentAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetCalendarModule()
        {
            string query = @"select id_module, module.name as module_name, calendar_module.start_year, calendar_module.end_year, calendar_module.fall_semester, calendar_module.spring_semester, calendar_module.fall_enough_sub, calendar_module.spring_enough_sub, calendar_module.more_semester from dbo.calendar_module
inner join module on module.id_module = calendar_module.module
inner join module_group on module.module_group = module_group.id_module_group
inner join asi_user on asi_user.id_asi_user = module.responsible
inner join site on module.site = site.id_site
where not module.module_group = 4 & 6; ";
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
