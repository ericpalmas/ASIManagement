﻿using Microsoft.AspNetCore.Http;
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
    public class AsiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AsiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @" 
                            select asi.id_asi,  id_module, code, module.name as module_name, ects, responsible, semester,  asi_user.name as responsible_name, asi_user.surname as responsible_surname  , module_group.initials, site.name
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
    }
}