using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers   {

    [ApiController] // used to handle api responses
    [Route("api/[controller]")] // can be accessed by ../api/OrderItem
    public class OrderItemController : ControllerBase   {
        private static OrderItem item = new OrderItem();
    }
}