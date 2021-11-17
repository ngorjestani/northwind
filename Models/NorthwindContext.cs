using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Northwind.Models
{
    public class NorthwindContext : DbContext
    {
        public NorthwindContext(DbContextOptions<NorthwindContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public void AddCustomer(Customer customer)
        {
            this.Add(customer);
            this.SaveChanges();
        }
        public void EditCustomer(Customer customer)
        {
            var customerToUpdate = Customers.FirstOrDefault(c => c.CustomerId == customer.CustomerId);
            customerToUpdate.Address = customer.Address;
            customerToUpdate.City = customer.City;
            customerToUpdate.Region = customer.Region;
            customerToUpdate.PostalCode = customer.PostalCode;
            customerToUpdate.Country = customer.Country;
            customerToUpdate.Phone = customer.Phone;
            customerToUpdate.Fax = customer.Fax;
            SaveChanges();
        }
        
        public CartItem AddToCart(CartItemJSON cartItemJSON)
        {
            CartItem cartItem = new CartItem()
            {
                CustomerId = Customers.FirstOrDefault(c => c.Email == cartItemJSON.email).CustomerId,
                ProductId = cartItemJSON.id,
                Quantity = cartItemJSON.qty
            };
            CartItems.Add(cartItem);
            SaveChanges();
            cartItem.Product = Products.Find(cartItem.ProductId);
            return cartItem;
        }
    }
}