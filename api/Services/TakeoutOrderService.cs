using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.TakeoutOrderService  {

    public class TakeoutOrderService : ITakeoutOrderService {
        
        private static List<TakeoutOrder> takeoutOrders = new List<TakeoutOrder>{
            new TakeoutOrder {ID = 1, Name = "Somebody", orderItems = {}, SubTotal = 0},
            new TakeoutOrder()
        };
        public List<TakeoutOrder> GetAllTakeoutOrders()   {
            return takeoutOrders;
        }

        public TakeoutOrder GetTakeoutOrderById(int id) {
            return takeoutOrders.FirstOrDefault(t => t.ID == id);
        }

        public List<TakeoutOrder> AddTakeoutOrder(TakeoutOrder order)   {
            order.ID = takeoutOrders.Count;
            takeoutOrders.Add(order);
            return takeoutOrders;
        }
    }
}