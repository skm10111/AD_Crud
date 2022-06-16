namespace backEnd.DTOs
{
    public class RegisterDTOs
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }

    public class LoginDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseDTO
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}
