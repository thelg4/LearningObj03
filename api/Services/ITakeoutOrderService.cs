using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using api.Models;

namespace api.Services.TakeoutOrderService  {
    public interface ITakeoutOrderService   {
        List<TakeoutOrder> GetAllTakeoutOrders();
        TakeoutOrder GetTakeoutOrderById(int id);
        List<TakeoutOrder> AddTakeoutOrder(TakeoutOrder order);
    }
}