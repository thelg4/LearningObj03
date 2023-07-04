using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.DeliveryOrderService {

    public interface IDeliveryOrderService  {
        List<DeliveryOrder> GetAllDeliveryOrders();
        DeliveryOrder GetDeliveryOrderById(int id);
        List<DeliveryOrder> AddDeliveryOrder(DeliveryOrder deliveryOrder);
    }
}