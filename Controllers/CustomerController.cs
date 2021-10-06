using Microsoft.AspNetCore.Mvc;
using Northwind.Models; 
using System.Linq;

namespace Northwind.Controllers 
{
    
    public class CustomerController : Controller
    {
        private NorthwindContext _northwindContext;
        public CustomerController(NorthwindContext db) => _northwindContext = db;

        public IActionResult Register() => View();
    }
    
}