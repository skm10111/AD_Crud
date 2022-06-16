using Microsoft.AspNetCore.Mvc;
using backEnd.Data;
using System.Threading.Tasks;
using backEnd.DTOs;
using Microsoft.AspNetCore.Identity;
using backEnd.Enitities;
using backEnd.Interfaces;

namespace backEnd.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
            ITokenService tokenService)
        {
           _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login(LoginDTO loginDTO)
        { 
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);
            if (user == null) return BadRequest("Invalid Username");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);
            if (!result.Succeeded) return BadRequest("Invalid Password");
            return new LoginResponseDTO
            {
                UserName = loginDTO.UserName,
                Token = await _tokenService.CreateToken(user)
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTOs accountDTOs)
        {
            var user = await _userManager.FindByNameAsync(accountDTOs.UserName);
            if (user != null) return BadRequest("User Already Taken");
            AppUser newUser = new AppUser
            {
                UserName = accountDTOs.UserName,
                Email = accountDTOs.Email,
                PhoneNumber = accountDTOs.PhoneNumber,
            };
            var result = await _userManager.CreateAsync(newUser, accountDTOs.Password);
            if (!result.Succeeded) return BadRequest("Failed to Register");
            return Ok();
        }

    }
}
