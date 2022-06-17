using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backEnd.Enitities;
using backEnd.Data;
using backEnd.DTOs;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace backEnd.Controllers
{
    [Authorize]
    public class EmployeeController : BaseController
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee(AddEmployeeDTO employeeDTO)
        {
            var emp = await _context.EmployeeData.Where(x => x.FirstName == employeeDTO.FirstName).FirstOrDefaultAsync();
            if (emp != null) return BadRequest("Account already exists");
            EmployeeData employee = new EmployeeData
            {
                FirstName = employeeDTO.FirstName,
                LastName = employeeDTO.LastName,
                Address = employeeDTO.Address,
                Experience = employeeDTO.Experience,
                Dob= employeeDTO.Dob
            };
            _context.EmployeeData.Add(employee);
             var result  = _context.SaveChanges();
            if (result == 0) BadRequest("Failed to Add Data");
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateEmployee(EmployeeDTO employeeDTO)
        {
            var emp = _context.EmployeeData.Where(x => x.Id == employeeDTO.Id).FirstOrDefault();
            if (emp == null) return BadRequest("Invalid Account");
            emp.FirstName = employeeDTO.FirstName;
            emp.LastName = employeeDTO.LastName;
            emp.Address = employeeDTO.Address;
            emp.Experience = employeeDTO.Experience;
            emp.Dob = employeeDTO.Dob;
            emp.Updated = employeeDTO.Updated;
            _context.Entry(emp).State = EntityState.Modified;
            var result = _context.SaveChanges();
            if (result == 0) BadRequest("Failed to Add Data");
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var emp = await _context.EmployeeData.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (emp == null) return BadRequest("Invalid Account");
            _context.EmployeeData.RemoveRange(_context.EmployeeData.Where(x => x.Id == id));
            var result = _context.SaveChanges();
            if (result == 0) BadRequest("Failed to Add Data");
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeData>>> GetEmployee()
        {
            var user = await _context.EmployeeData.ToListAsync();
            return Ok(user);
        }
        [HttpGet("edit/{id}")]
        public async Task<ActionResult<EmployeeData>> GetEmployeeDetail(int id)
        {
            return await _context.EmployeeData.SingleOrDefaultAsync(x => x.Id == id);
        }
     

    }
}
