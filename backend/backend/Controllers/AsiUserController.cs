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
    public class AsiUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AsiUserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("api/asiuser")]
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
        [HttpGet("api/asiuser/{id}")]
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

        
        [HttpPost("api/asiuser/login")]
        public JsonResult Post(AsiUser user)
        {
              Console.WriteLine(user);

            string query = @" 
                              select * from dbo.asi_user 
                              inner join asi on asi.asi_user = asi_user.id_asi_user
                              where asi_user.email = @AsiUserEmail AND asi_user.password = @AsiUserPassword AND asi.created_at = ( select max(created_at) from asi where asi.asi_user = asi_user.id_asi_user)               
                              ";
               DataTable table = new DataTable();
               string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
               SqlDataReader myReader;
               using (SqlConnection myCon = new SqlConnection(sqlDataSource))
               {           
                   myCon.Open();
                   using (SqlCommand myCommand = new SqlCommand(query, myCon))
                   {
                       myCommand.Parameters.AddWithValue("@AsiUserEmail", user.AsiUserEmail);
                       myCommand.Parameters.AddWithValue("@AsiUserPassword", user.AsiUserPassword);

                       myReader = myCommand.ExecuteReader();
                       table.Load(myReader);
                       myReader.Close();
                       myCon.Close();
                   }
               }

               return new JsonResult(table);
           }



        [HttpGet("api/asiuser/type/{id}")]
        public JsonResult GetUserType(int id)
        {
            string query = @" 
                            select * from dbo.user_user_type 
                            inner join asi_user on asi_user.id_asi_user = user_user_type.asi_user
                            inner join user_type on user_type.id_user_type = user_user_type.user_type
                            where user_user_type.asi_user = @UserId
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
