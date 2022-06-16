using System;

namespace backEnd.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; } 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Experience { get; set; }
        public string Address { get; set; }
        public DateTime  Dob { get; set; }
        public DateTime Updated { get; set; } =DateTime.Now;
    }

    public class AddEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Experience { get; set; }
        public string Address { get; set; }
        public DateTime Dob { get; set; } = DateTime.Now;
    }
}
