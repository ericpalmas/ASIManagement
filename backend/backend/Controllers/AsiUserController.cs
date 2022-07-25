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
                        select id_asi_user, name, surname, email, role  from  dbo.asi_user where expired is null
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
        [Authorize(Roles = "Advisor, StudentAdvisor, ProfileResponsibleStudentAdvisor, ProfileResponsibleAdvisor, Administrator")]
        public JsonResult GetAvailableStudent()
        {

            string query = @"                          
                  select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, asi_user.expired, 
                  user_type.id_user_type,user_type.name as user_type_name from asi_user 
                  inner join user_type on asi_user.role = user_type.id_user_type
                  where (asi_user.advisor is NULL AND asi_user.expired is null) AND user_type.id_user_type = 1 
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

        [HttpGet("api/asiuser/advisors")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Student, Administrator")]
        public JsonResult GetAdvisors()
        {

            string query = @"                          
select id_asi_user, name, surname, email, modality, profile, advisor, enrollment_number, role, expired, profile_responsible from dbo.asi_user where (asi_user.role = 5 OR  asi_user.role = 7 OR  asi_user.role = 9 OR  asi_user.role = 10) AND asi_user.expired is null
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

        [HttpGet("api/asiuser/profilesResponsible")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Student, Administrator")]
        public JsonResult GetProfileResponsibles()
        {

            string query = @"                          
              select id_asi_user, asi_user.name, surname, email, modality, profile, advisor, enrollment_number, role, asi_user.expired, profile.id_profile as profile_responsible_id,  profile.name as profile_responsible_name from dbo.asi_user 
              left outer join dbo.profile on profile.id_profile = asi_user.profile_responsible
              where (asi_user.role = 8 OR  asi_user.role = 9 OR  asi_user.role = 10) AND asi_user.expired is null
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
              select asi_user.id_asi_user,  asi_user.name,  asi_user.surname,  asi_user.email,  asi_user.modality,  asi_user.profile, asi_user.expired, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname,  asi_user.enrollment_number,  asi_user.role from asi_user
              left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
              where (asi_user.role = 1 OR  asi_user.role = 7) AND asi_user.expired is null
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

        [HttpGet("api/asiuser/tutors")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Student, Administrator")]
        public JsonResult GetTutors()
        {

            string query = @"                          
                  select id_asi_user, name, surname, email, modality, profile, advisor, enrollment_number, role, expired, profile_responsible from dbo.asi_user where (asi_user.role = 11 OR  asi_user.role = 12  OR asi_user.role = 13 OR  asi_user.role = 14) AND asi_user.expired is null";
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

        [HttpPost("api/asiuser/followStudent/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor, Administrator")]
        public JsonResult followStudent(AsiUser advisor, int id)
        {
            //var currentUser = GetCurrentUser();

            string query = @"                          
                       UPDATE asi_user
                       SET  asi_user.advisor = @AdvisorId
                       WHERE asi_user.id_asi_user = @StudentId;
                       select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, asi_user.expired, user_type.id_user_type,user_type.name as user_type_name from asi_user 
                       inner join user_type on asi_user.role = user_type.id_user_type
		               where asi_user.expired is null";

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
                    myCommand.Parameters.AddWithValue("@AdvisorId", advisor.AsiUserId);
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
        [Authorize(Roles = "Advisor, StudentAdvisor, Administrator")]
        public JsonResult stopFollowStudent(int id)
        {

            string query = @"                          
                       UPDATE asi_user
                       SET  asi_user.advisor = null
                       WHERE asi_user.id_asi_user = @StudentId;
                       select asi_user.id_asi_user, asi_user.name, asi_user.surname,asi_user.email,asi_user.advisor, asi_user.expired, user_type.id_user_type,user_type.name as user_type_name from asi_user 
                       inner join user_type on asi_user.role = user_type.id_user_type
	                   where asi_user.expired is null";

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
        [Authorize(Roles = "Advisor, StudentAdvisor, ProfileResponsibleStudentAdvisor, ProfileResponsibleAdvisor")]
        public JsonResult GetAdvisorStudents()
        {
            var currentUser = GetCurrentUser();


            string query = @" 
              select asi_user.id_asi_user,  asi_user.name,  asi_user.surname,  asi_user.email, asi_user.expired,  asi_user.modality,  asi_user.profile, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname,  asi_user.enrollment_number,  asi_user.role from asi_user
              left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
              where asi_user.advisor = @UserId AND asi_user.expired is null
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


        [HttpGet("api/advisorStudents/{id}")]
        [Authorize(Roles = "Advisor, StudentAdvisor, ProfileResponsibleStudentAdvisor, ProfileResponsibleAdvisor, Administrator")]
        public JsonResult GetSpecificAdvisorStudents(int id)
        {
           
            string query = @" 
                  select asi_user.id_asi_user,  asi_user.name,  asi_user.surname,  asi_user.email,asi_user.expired,  asi_user.modality,  asi_user.profile, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname,  asi_user.enrollment_number,  asi_user.role from asi_user
                  left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
                  where asi_user.advisor = @UserId AND asi_user.expired is null";

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


        [HttpGet("api/asiuser/adminData")]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor, Tutor, TutorAdvisor, TutorAdvisorProfileResponsible, TutorProfileResponsible  ")]
        public JsonResult GetAdministrativeData()
        {
            var currentUser = GetCurrentUser();


            string query = @" 
               select TOP 1 asi_user.id_asi_user as student_id, asi_user.name as student_name,  asi_user.surname as student_surname, asi_user.enrollment_number as student_enrollment_number,  asi_user.email as student_email,asi_user.expired,  modality.name as modality, profile.name as profile, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname,  asi_user.enrollment_number,  asi_user.role, profile_resp.name as profile_responsible_id, profile_resp.name as profile_responsible_name , profile_resp.surname as profile_responsible_surname  from asi_user
               left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
               left outer join modality on modality.id_modality = asi_user.modality
               left outer join profile on profile.id_profile = asi_user.profile
               left outer join asi_user as profile_resp on asi_user.profile = profile_resp.profile_responsible
               where asi_user.id_asi_user = @UserId AND asi_user.expired is null 
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




        [HttpGet("api/asiuser/adminData/{id}")]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor, Tutor, TutorAdvisor, TutorAdvisorProfileResponsible, TutorProfileResponsible ")]
        public JsonResult GetSpecificAdministrativeData(int id)
        {

            string query = @" 
              select TOP 1 asi_user.id_asi_user as student_id, asi_user.name as student_name,  asi_user.surname as student_surname, asi_user.enrollment_number as student_enrollment_number, asi_user.profile_responsible, asi_user.expired,  asi_user.email as student_email,  modality.name as modality, modality.id_modality as id_modality, profile.name as profile, profile.id_profile as id_profile, adv.id_asi_user as advisor_id, adv.name as advisor_name, adv.surname as advisor_surname, asi_user.role, user_type.name as role_name, profile_resp.name as profile_responsible_id, profile_resp.name as profile_responsible_name , profile_resp.surname as profile_responsible_surname  from asi_user
              left outer join asi_user as adv on adv.id_asi_user = asi_user.advisor
              left outer join modality on modality.id_modality = asi_user.modality
              left outer join profile on profile.id_profile = asi_user.profile
              left outer join asi_user as profile_resp on asi_user.profile = profile_resp.profile_responsible
              left outer join user_type on user_type.id_user_type = asi_user.role
              where asi_user.id_asi_user = @UserId AND asi_user.expired is null";

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
              where asi_user.profile = (select profile_responsible from asi_user where asi_user.id_asi_user = @UserId )
              AND asi_user.role = 1 AND asi_user.expired is null";

            Console.WriteLine(currentUser.AsiUserId);

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

        [HttpGet("api/asiuser/tutorStudents")]
        [Authorize(Roles = "Tutor, ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor")]
        public JsonResult GetTutorStudents()
        {
            var currentUser = GetCurrentUser();

            string query = @"                    
 select * from asi_module
inner join module on module.id_module = asi_module.module
inner join asi_module_group on asi_module_group.id_asi_module_group = asi_module.asi_module_group
inner join asi on asi.id_asi = asi_module_group.asi
inner join asi_user on asi_user.id_asi_user = asi.asi_user
where module.responsible = 5077 AND asi_module.expired is null";

            Console.WriteLine(currentUser.AsiUserId);

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

                JsonResult userFound = new JsonResult( new { Token = token, Message = "User found", AsiUserId = user.AsiUserId, AsiUserName = user.AsiUserName, AsiUserSurname = user.AsiUserSurname, AsiUserEmail = user.AsiUserEmail, Role = user.Role });
                userFound.StatusCode = 200;
                return userFound;

            }

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


        /*[HttpGet("api/asiuser/admins")]
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
        
        [HttpGet("api/asiuser/Public")]
        public IActionResult Public()
        {
            return Ok("Hi, you're on public property");
        }
         */

        [HttpGet("api/asiuser/current")]
        [Authorize(Roles = "Advisor,Student, StudentAdvisor, Administrator,ProfileResponsible,ProfileResponsibleAdvisor, ProfileResponsibleStudentAdvisor, Tutor, TutorAdvisor, TutorAdvisorProfileResponsible, TutorProfileResponsible  ")]
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

            string query = "DECLARE @USER_ID int; DECLARE @STATE_ID int; DECLARE @ASI_ID int;";    

           
            if(request.Role == "1")
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.Modality + ");";

                query += "SELECT @USER_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi_state(created_at, advisor_approvation, master_responsable_approvation, profile_responsible_approvation, saved_locally) values (GETDATE(),0,0,0,0)";

                query += "SELECT @STATE_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi(created_at, asi_state, asi_user) VALUES (GETDATE(), @STATE_ID, @USER_ID);";

                query += "SELECT @ASI_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi_module_group(asi, module_group) VALUES(@ASI_ID, 1),(@ASI_ID, 2),(@ASI_ID, 3),(@ASI_ID, 4),(@ASI_ID, 5),(@ASI_ID, 6);";
           
            } else if (request.Role == "8" || request.Role == "9" || request.Role == "13" || request.Role == "14")
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, profile_responsible, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.ProfileResponsible + "," + request.Modality + ");";

            } else
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.Modality + ");";

            }


            query += "select id_asi_user, name, surname, email, modality, profile, advisor, enrollment_number, role, profile_responsible from(SELECT TOP 1 * FROM dbo.asi_user ORDER BY asi_user.id_asi_user DESC) as last_element";


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

        [HttpPost("api/asiuser/update")]
        [Authorize(Roles = "Administrator")]

        public JsonResult UpdateUser(AsiUser request)
        {

            /* capire se devo poter modificare anche la password degli utenti
             * 
             * string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(request.AsiUserPassword);

            string query = "DECLARE @USER_ID int; DECLARE @STATE_ID int; DECLARE @ASI_ID int;";

            query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.Modality + ");";


            if(request.Role == "1")
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.Modality + ");";

                query += "SELECT @USER_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi_state(created_at, advisor_approvation, master_responsable_approvation, profile_responsible_approvation, saved_locally) values (GETDATE(),0,0,0,0)";

                query += "SELECT @STATE_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi(created_at, asi_state, asi_user) VALUES (GETDATE(), @STATE_ID, @USER_ID);";

                query += "SELECT @ASI_ID = SCOPE_IDENTITY();";

                query += "INSERT INTO dbo.asi_module_group(asi, module_group) VALUES(@ASI_ID, 1),(@ASI_ID, 2),(@ASI_ID, 3),(@ASI_ID, 4),(@ASI_ID, 5),(@ASI_ID, 6);";
           
            } else if (request.Role == "8" || request.Role == "9" || request.Role == "13" || request.Role == "14") 
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, profile_responsible, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.ProfileResponsible + "," + request.Modality + ");";

            } else
            {
                query += @"INSERT INTO dbo.asi_user(name, surname, email, enrollment_number, password, role, profile, modality ) VALUES ('" + request.AsiUserName + "','" + request.AsiUserSurname + "','" + request.AsiUserEmail + "','" + request.AsiUserEnrollmentNumber + "','" + encryptedPassword + "'," + request.Role + "," + request.Profile + "," + request.Modality + ");";

            }*/


            string query = @"";
            if(request.Role == "1")
            {
                if(request.Advisor != -1)
                  query += "UPDATE dbo.asi_user SET asi_user.name = '" + request.AsiUserName + "',asi_user.surname = '" + request.AsiUserSurname + "',asi_user.email = '" + request.AsiUserEmail + "', asi_user.enrollment_number = '" + request.AsiUserEnrollmentNumber + "',asi_user.modality = " + request.Modality + ",asi_user.profile = "+ request.Profile + ",asi_user.advisor = "+ request.Advisor + ",asi_user.role = "+ request.Role + " WHERE asi_user.id_asi_user = " + request.AsiUserId + ";";
                else
                  query += "UPDATE dbo.asi_user SET asi_user.name = '" + request.AsiUserName + "',asi_user.surname = '" + request.AsiUserSurname + "',asi_user.email = '" + request.AsiUserEmail + "', asi_user.enrollment_number = '" + request.AsiUserEnrollmentNumber + "',asi_user.modality = " + request.Modality + ",asi_user.profile = " + request.Profile +  ",asi_user.role = " + request.Role + " WHERE asi_user.id_asi_user = " + request.AsiUserId + ";";

            } else if (request.Role == "8" || request.Role == "9" || request.Role == "13" || request.Role == "14")
            {
                query += "UPDATE dbo.asi_user SET asi_user.name = '" + request.AsiUserName + "',asi_user.surname = '" + request.AsiUserSurname + "',asi_user.email = '" + request.AsiUserEmail + "', asi_user.enrollment_number = '" + request.AsiUserEnrollmentNumber + "',asi_user.modality = " + request.Modality + ",asi_user.profile = " + request.Profile + ",asi_user.profile_responsible = " + request.ProfileResponsible + ",asi_user.role = " + request.Role + " WHERE asi_user.id_asi_user = " + request.AsiUserId + ";";

            } else
            {
                query += "UPDATE dbo.asi_user SET asi_user.name = '" + request.AsiUserName + "',asi_user.surname = '" + request.AsiUserSurname + "',asi_user.email = '" + request.AsiUserEmail + "', asi_user.enrollment_number = '" + request.AsiUserEnrollmentNumber + "',asi_user.modality = " + request.Modality + ",asi_user.profile = " + request.Profile + ",asi_user.role = " + request.Role + " WHERE asi_user.id_asi_user = " + request.AsiUserId + ";";


            }







            query += "select * from dbo.asi_user where expired is null;";


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

    

        [HttpDelete("api/asiuser/{id}")]
        [Authorize(Roles = "Administrator")]
        public JsonResult DeleteUser(int id)
        {

            /*string query = "DELETE FROM dbo.asi_module WHERE asi_module_group in (select id_asi_module_group from dbo.asi_module_group where asi in(select asi.id_asi from dbo.asi where asi.asi_user = @UserId))";

            query += "DELETE FROM dbo.asi_module_group WHERE asi_module_group.asi in (select asi.id_asi from dbo.asi where asi.asi_user = @UserId);";

            query += "DELETE FROM dbo.asi WHERE asi.asi_user = @UserId;";

            query += "DELETE FROM dbo.asi_user WHERE asi_user.id_asi_user = @UserId;";*/

            string query = "UPDATE dbo.asi_module SET expired = GETDATE() WHERE asi_module_group in (select id_asi_module_group from dbo.asi_module_group where asi in(select asi.id_asi from dbo.asi where asi.asi_user = @UserId));";

            query += "UPDATE dbo.asi_module_group SET expired = GETDATE() WHERE asi_module_group.asi in (select asi.id_asi from dbo.asi where asi.asi_user = @UserId);";

            query += "UPDATE dbo.asi SET expired = GETDATE() WHERE asi.asi_user = @UserId;";

            query += "UPDATE dbo.asi_user SET expired = GETDATE() WHERE asi_user.id_asi_user = @UserId;";
            


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
