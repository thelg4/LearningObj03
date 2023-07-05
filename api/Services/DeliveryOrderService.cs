using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.DeliveryOrderService {
    public class DeliveryOrderService : IDeliveryOrderService {

        private static List<DeliveryOrder> deliveryOrders = new List<DeliveryOrder>{
            new DeliveryOrder {Id = 1, Name = "John doe", Address = "212 Bleeker St.", OrderItems = {}, SubTotal = 0}
        };

        public List<DeliveryOrder> GetAllDeliveryOrders()   {
            return deliveryOrders;
        }
        public DeliveryOrder GetDeliveryOrderById(int id)   {
            return deliveryOrders.FirstOrDefault(i => i.Id == id);
        }
        public List<DeliveryOrder> AddDeliveryOrder(DeliveryOrder deliveryOrder) {
            deliveryOrder.Id = deliveryOrders.Count;
            deliveryOrders.Add(deliveryOrder);
            SetSubTotal(deliveryOrder);
            return deliveryOrders;
        }

        public void SetSubTotal(DeliveryOrder order)    {
            double subTotal = 0;
            foreach(OrderItem item in order.OrderItems) {
                subTotal += item.Price;
            }
            order.SubTotal = subTotal;
        }
    }
}