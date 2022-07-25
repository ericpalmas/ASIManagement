namespace backend.Models
{
    public class AsiUser
    {
        public int AsiUserId { get; set; }
        public string AsiUserName { get; set; }
        public string AsiUserSurname { get; set; }
        public string AsiUserEmail { get; set; }
        public string AsiUserPassword { get; set; }
        public string AsiUserEnrollmentNumber { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }
        public int Modality { get; set; }
        public int Profile { get; set; }
        public int ProfileResponsible { get; set; }
        public int Advisor { get; set; }
        public int[] Roles { get; set; }
        public string Role { get; set; }
    }
}
