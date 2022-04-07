using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using backend.Models;
using Microsoft.Extensions.Configuration;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsiUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AsiUserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @" 
                            select id_asi_user, name, surname, email from 
                            dbo.asi_user
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

        //mettere un controllo nel caso lo studente non abbia un advisor nella query
        [HttpGet("{id}")]
        public JsonResult GetAdministrativeData(int id)
        {
            string query = @" 
WITH student AS (select asi_user.id_asi_user as student_id, asi_user.enrollment_number as student_enrollment_number, asi_user.name as student_name, asi_user.surname as student_surname , advisor as id_advisor, modality.name as modality, profile.name as profile  from dbo.asi_user
inner join modality on modality.id_modality = asi_user.modality
inner join profile on profile.id_profile = asi_user.profile
where id_asi_user = @UserId) 
SELECT  student.student_id , student.student_name, student.student_surname, student.student_enrollment_number as student_enrollment_number, student.modality, student.profile, asi_user.id_asi_user as advisor_id, asi_user.name as advisor_name, asi_user.surname as advisor_surname  FROM  student
left outer join dbo.asi_user on student.id_advisor = asi_user.id_asi_user
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
