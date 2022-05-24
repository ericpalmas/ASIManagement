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
    public class AsiUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        //public static AsiUser user = new AsiUser();

        public AsiUserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
 
        [HttpGet("api/asiuser")]
        [Authorize(Roles = "Student,Advisor, StudentAdvisor, Administrator")]
        public JsonResult Get()
        {
            string query = @" 
                            select id_asi_user, name, surname, email, role from 
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

        [HttpGet("api/asiuser/availableStudents")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAvailableStudent()
        {
            var currentUser = GetCurrentUser();

            string query = @"                          
                 select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, user_type.id_user_type,user_type.name as user_type_name from asi_user 
                 inner join user_type on asi_user.role = user_type.id_user_type
                 where (asi_user.advisor is NULL) AND user_type.id_user_type = 1
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

        [HttpGet("api/asiuser/advisors")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Student, Administrator")]
        public JsonResult GetAdvisors()
        {

            string query = @"                          
                  select * from dbo.asi_user where asi_user.role = 5 OR  asi_user.role = 7
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

        [HttpGet("api/asiuser/students")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Student, Administrator")]
        public JsonResult GetStudents()
        {

            string query = @"                          
                  select * from dbo.asi_user where asi_user.role = 1 OR  asi_user.role = 7
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

        [HttpGet("api/asiuser/followStudent/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult followStudent(int id)
        {
            var currentUser = GetCurrentUser();

            string query = @"                          
                       UPDATE asi_user
                       SET  asi_user.advisor = @AdvisorId
                       WHERE asi_user.id_asi_user = @StudentId;
                       select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, user_type.id_user_type,user_type.name as user_type_name from asi_user 
                       inner join user_type on asi_user.role = user_type.id_user_type
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
                    myCommand.Parameters.AddWithValue("@AdvisorId", currentUser.AsiUserId);
                    myCommand.Parameters.AddWithValue("@StudentId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asiuser/stopFollowStudent/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult stopFollowStudent(int id)
        {

            string query = @"                          
                       UPDATE asi_user
                       SET  asi_user.advisor = null
                       WHERE asi_user.id_asi_user = @StudentId;
                       select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, user_type.id_user_type,user_type.name as user_type_name from asi_user 
                       inner join user_type on asi_user.role = user_type.id_user_type
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
                    myCommand.Parameters.AddWithValue("@StudentId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("api/advisorStudents")]
        [Authorize(Roles = "Advisor, StudentAdvisor")]
        public JsonResult GetAdvisorStudents()
        {
            var currentUser = GetCurrentUser();


            string query = @" 
                select id_asi_user, name, surname, email, modality, profile, advisor, enrollment_number, role from asi_user
                where asi_user.advisor = @UserId
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



        //mettere un controllo nel caso lo studente non abbia un advisor nella query
        /*[HttpGet("api/asiuser/{id}")]
        [Authorize(Roles = "Student")]
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
        }*/

        [HttpGet("api/asiuser/adminData")]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor ")]
        public JsonResult GetAdministrativeData()
        {
            var currentUser = GetCurrentUser();


            string query = @" 
                             WITH student AS (select asi_user.id_asi_user as student_id, asi_user.enrollment_number as student_enrollment_number, asi_user.name as student_name, asi_user.surname as student_surname , advisor as id_advisor, modality.name as modality, profile.name as profile  from dbo.asi_user
left outer join modality on modality.id_modality = asi_user.modality
left outer join profile on profile.id_profile = asi_user.profile
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
                    myCommand.Parameters.AddWithValue("@UserId", currentUser.AsiUserId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("api/asiuser/type/{id}")]
        [Authorize(Roles = "Student")]
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

 /* select* from dbo.asi_user
where profile = (select profile from asi_user where asi_user.id_asi_user = @UserId)
AND(role = 1 OR role = 7) */

        [HttpGet("api/asiuser/studentsByProfile")]
        [Authorize(Roles = "ProfileResponsible, ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetStudentByProfile()
        {
            var currentUser = GetCurrentUser();

            string query = @"                    
select asi_user.id_asi_user, asi_user.name , asi_user.surname, asi_user.email, asi_user.modality, asi_user.profile, asi_user.enrollment_number, asi_user.role, asi_user.profile_responsible 
, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname
from dbo.asi_user
left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
where asi_user.profile = (select profile_responsible from asi_user where asi_user.id_asi_user = @UserId)
AND (asi_user.role = 1 OR asi_user.role = 7)
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

        [HttpPost("api/asiuser/login")]
        public JsonResult Login(AsiUser userLogin)
        {
            var user = Authenticate(userLogin);



            if (user != null)
            {
                var token = Generate(user);
                //user.Token = token;

                //return new JsonResult("Token");

                JsonResult userFound = new JsonResult( new { Token = token, Message = "User found", AsiUserId = user.AsiUserId, AsiUserName = user.AsiUserName, AsiUserSurname = user.AsiUserSurname, AsiUserEmail = user.AsiUserEmail, Role = user.Role });
                userFound.StatusCode = 200;
                return userFound;

            }

            //return NotFound("User not found");
            JsonResult userNotFound = new JsonResult(new { Message = "User not found" });
            userNotFound.StatusCode = 404;
            return userNotFound;
        }

        private string Generate(AsiUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.AsiUserId.ToString()),
                new Claim(ClaimTypes.GivenName, user.AsiUserName),
                new Claim(ClaimTypes.Surname, user.AsiUserSurname),
                new Claim(ClaimTypes.Email, user.AsiUserEmail),
                new Claim(ClaimTypes.Role, user.Role),
                //new Claim(ClaimTypes.Actor, user.Profile.ToString()),

            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private AsiUser Authenticate(AsiUser userLogin)
        {
            List<AsiUser> users = new List<AsiUser>();
            string sqlDataSource = _configuration.GetConnectionString("AsiAppCon");
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                string query = "select asi_user.id_asi_user, asi_user.name,asi_user.surname, asi_user.profile, asi_user.email,asi_user.password,user_type.name as role from asi_user inner join user_type on user_type.id_user_type = asi_user.role";
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.Connection = con;
                    con.Open();
                    using (SqlDataReader sdr = cmd.ExecuteReader())
                    {
                        while (sdr.Read())
                        {
                            users.Add(new AsiUser
                            {
                                AsiUserId = Convert.ToInt32(sdr["id_asi_user"]),
                                AsiUserName = sdr["name"].ToString(),
                                AsiUserSurname = sdr["surname"].ToString(),
                                AsiUserEmail = sdr["email"].ToString(),
                                AsiUserPassword = sdr["password"].ToString(),
                                Role = sdr["role"].ToString(),

                           
                                //Profile = Convert.ToInt32(sdr["profile"]),

                            }); ; ;
                        }
                    }
                    con.Close();
                }
            }


            AsiUser user = users.FirstOrDefault(o => o.AsiUserEmail.ToLower() == userLogin.AsiUserEmail.ToLower());

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(userLogin.AsiUserPassword, user.AsiUserPassword);

            if (isValidPassword)
            {
                return user;
            }
            return null;
        }


        [HttpGet("api/asiuser/admins")]
        [Authorize(Roles = "Administrator")]
        public IActionResult AdminsEndpoint()
        {
            var currentUser = GetCurrentUser();

            return Ok($"Hi {currentUser.AsiUserName} {currentUser.AsiUserSurname}, you are an {currentUser.Role}, Email: {currentUser.AsiUserEmail}, Id:  {currentUser.AsiUserId} ");
        }


        [HttpGet("api/asiuser/student")]
        [Authorize(Roles = "Student")]
        public IActionResult StudentEndpoint()
        {
            var currentUser = GetCurrentUser();

            return Ok($"Hi {currentUser.AsiUserName} {currentUser.AsiUserSurname}, you are an {currentUser.Role}, Email: {currentUser.AsiUserEmail}, Id:  {currentUser.AsiUserId} ");
        }

        [HttpGet("api/asiuser/advisor")]
        [Authorize(Roles = "Advisor")]
        public IActionResult AdvisorEndpoint()
        {
            var currentUser = GetCurrentUser();

            return Ok($"Hi {currentUser.AsiUserName} {currentUser.AsiUserSurname}, you are an {currentUser.Role}, Email: {currentUser.AsiUserEmail}, Id:  {currentUser.AsiUserId} ");
        }

        [HttpGet("api/asiuser/AdvisorAndStudent")]
        [Authorize(Roles = "Advisor,Student")]
        public IActionResult AdvisorAndStudentEndpoint()
        {
            var currentUser = GetCurrentUser();

            return Ok($"Hi {currentUser.AsiUserName} {currentUser.AsiUserSurname}, you are an {currentUser.Role}, Email: {currentUser.AsiUserEmail}, Id:  {currentUser.AsiUserId} ");
        }

        [HttpGet("api/asiuser/current")]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor ")]
        public JsonResult GetLoggedUser()
        {
            var currentUser = GetCurrentUser();

            if(currentUser != null)
            {
                JsonResult userFound = new JsonResult(new {  Message = "User found", AsiUserId = currentUser.AsiUserId, AsiUserName = currentUser.AsiUserName, AsiUserSurname = currentUser.AsiUserSurname, AsiUserEmail = currentUser.AsiUserEmail, Role = currentUser.Role });
                userFound.StatusCode = 200;
                return userFound;

            } else
            {
                JsonResult userNotFound = new JsonResult(new { Message = "User not found" });
                userNotFound.StatusCode = 404;
                return userNotFound;
            }
        }

        [HttpGet("api/asiuser/Public")]
        public IActionResult Public()
        {
            return Ok("Hi, you're on public property");
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

        [HttpPost("api/asiuser/register")]
        public JsonResult Register(AsiUser request)
        {

            string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(request.AsiUserPassword);

            string query = @"INSERT INTO dbo.asi_user(name, surname, email, password, role ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + encryptedPassword + "',"+ request.Role + ");";

            /*string query = @"";
            query += "INSERT INTO dbo.asi_user(name, surname, email, password ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + encryptedPassword + "');";

            query += "INSERT INTO dbo.user_user_type(asi_user,user_type ) VALUES ";
            for (int i = 0; i < request.Roles.Length; i++)
            {
                query += "((SELECT @@IDENTITY AS ID), " + request.Roles[i] + ")";
                if (i == request.Roles.Length - 1)
                    query += ";";
                else
                    query += ",";
            }*/

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

        /*private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }*/
        
   
        /*private string EncodePasswordToBase64(string password)
        {
            try
            {
                byte[] encData_byte = new byte[password.Length];
                encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
                string encodedData = Convert.ToBase64String(encData_byte);
                return encodedData;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in base64Encode" + ex.Message);
            }
        }
        private string DecodeFrom64(string encodedData)
        {
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(encodedData);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result;
        }*/



    }





}
