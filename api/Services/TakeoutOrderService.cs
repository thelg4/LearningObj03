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
        };
        public List<TakeoutOrder> GetAllTakeoutOrders()   {
            return takeoutOrders;
        }

        public TakeoutOrder GetTakeoutOrderById(int id) {
            return takeoutOrders.FirstOrDefault(t => t.ID == id);
        }

        public List<TakeoutOrder> AddTakeoutOrder(TakeoutOrder order)   {
            order.ID = takeoutOrders.Count;
            SetSubTotal(order);
            takeoutOrders.Add(order);
            return takeoutOrders;
        }

        // updates the subtotal in the order
        public void SetSubTotal (TakeoutOrder order)    {
            double subTotal = 0;
            foreach (OrderItem i in order.orderItems) {
                subTotal += i.Price;
            }
            order.SubTotal = subTotal;
        }
    }
}