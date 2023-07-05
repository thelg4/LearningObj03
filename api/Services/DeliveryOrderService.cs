using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.DeliveryOrderService {
    public class DeliveryOrderService : IDeliveryOrderService {

        private static List<DeliveryOrder> deliveryOrders = new List<DeliveryOrder>{
            new DeliveryOrder {Id = 1, Name = "Somebody", Address = "some street", OrderItems = {}},
            new DeliveryOrder()
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
            return deliveryOrders;
        }
    }
}