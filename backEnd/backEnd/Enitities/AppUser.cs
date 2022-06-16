using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace backEnd.Enitities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}
