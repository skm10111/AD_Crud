using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace backEnd.Enitities
{
    public class AppRole: IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles {  get; set; }
    }
}
