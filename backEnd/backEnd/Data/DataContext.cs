using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backEnd.Enitities;
using Microsoft.EntityFrameworkCore;

namespace backEnd.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<EmployeeData> EmployeeData { get; set; }
    }
}
