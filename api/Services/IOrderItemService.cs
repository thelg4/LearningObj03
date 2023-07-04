using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.OrderItemService {

    public interface IOrderItemService {
        List<OrderItem> GetAllOrderItems();
        OrderItem GetItemById(int id);
        List<OrderItem> AddOrderItem(OrderItem item);  
    }
}