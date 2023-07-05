using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.OrderItemService {
    public class OrderItemService : IOrderItemService
    {

        private static List<OrderItem> items = new List<OrderItem>{
            new OrderItem {ID = 1, Name = "Pizza", Price = 15.00},
            new OrderItem {ID = 2, Name = "Hamburger", Price = 10.00},
            new OrderItem {ID = 3, Name = "Water", Price = 1.99}
        };
        public List<OrderItem> AddOrderItem(OrderItem item)
        {
            items.Add(item);
            return items;
        }

        public List<OrderItem> GetAllOrderItems()
        {
            return items;
        }

        public OrderItem GetItemById(int id)
        {
            return items.FirstOrDefault(i => i.ID == id)!;
        }
    }
}