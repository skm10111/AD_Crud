using Microsoft.AspNetCore.Identity;

namespace backEnd.Enitities
{
    public class AppUserRole: IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public string Role { get; set; }
    }
}
