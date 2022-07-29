using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            /*MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("Tester", "ericpalmas96@gmail.com"));

            message.To.Add(MailboxAddress.Parse("ericpalmas96@gmail.com"));

            message.Subject = "Wuuf";
            message.Body = new TextPart("Plain") { Text = @"Yes, Hello! This is dog!" };

            Console.Write("Email: ");
            string emailAddress = Console.ReadLine();
            Console.Write("Password: ");

            ConsoleColor originalBGColor = Console.BackgroundColor;
            ConsoleColor originalFGColor = Console.BackgroundColor;

            Console.BackgroundColor = ConsoleColor.Green;
            Console.ForegroundColor = ConsoleColor.Green;

            string password = Console.ReadLine();

            Console.BackgroundColor = originalBGColor;
            Console.ForegroundColor = originalFGColor;*/


        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
