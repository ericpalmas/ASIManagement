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
    public class ModalityController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ModalityController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]")]
        [HttpGet]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor ")]
        public JsonResult GetCourses()
        {
            string query = @" select * from dbo.modality";
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
