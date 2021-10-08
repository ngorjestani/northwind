using System;
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

        public IActionResult CustomerList() => View(_northwindContext.Customers);

        [HttpPost]
        [ValidateAntiForgeryToken] 
        public IActionResult AddCustomer(Customer customer)
        {
            Console.WriteLine("Adding customer");
            _northwindContext.AddCustomer(customer);
            return RedirectToAction("CustomerList");
        }
    }
    
}