using System;

namespace backEnd.Enitities
{
    public class EmployeeData
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Experience { get; set; }
        public string Address { get; set; }
        public DateTime Dob { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
    }
}
