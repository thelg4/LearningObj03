using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Services.OrderItemService;

namespace api.Controllers   {

    [ApiController] // used to handle api responses
    [Route("api/[controller]")] // can be accessed by ../api/OrderItem
    public class OrderItemController : ControllerBase   {

        private readonly IOrderItemService _orderItemService;

        public OrderItemController(IOrderItemService orderItemService) {
            _orderItemService = orderItemService;
        }

        [HttpGet("GetAll")]
        public ActionResult<List<OrderItem>> GetActionResult()  {
            return Ok(_orderItemService.GetAllOrderItems());
        }

        [HttpGet("GetOne/{id}")]
        public ActionResult<OrderItem> GetSingle(int id) {
            return Ok(_orderItemService.GetItemById(id));
        }

        // add one 
        [HttpPost]
        public ActionResult<List<OrderItem>> AddItem(OrderItem item) {
            return Ok(_orderItemService.AddOrderItem(item));
        }
    }
}