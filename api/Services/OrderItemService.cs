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
            new OrderItem {ID = 1, Name = "some food", Price = 5.00},
            new OrderItem()
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