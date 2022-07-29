using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using backend.Services.EmailService;
using backend.Models;
using System;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]

        public IActionResult SendEmail(EmailDto request)
        {
            try
            {
                 _emailService.SendEmail(request);
                 return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
           
        }
    }
}
