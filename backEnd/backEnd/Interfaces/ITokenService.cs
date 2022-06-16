using System.Threading.Tasks;
using backEnd.Enitities;

namespace backEnd.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
