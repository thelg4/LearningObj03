using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Services.DeliveryOrderService;

namespace api.Controllers   {

    [ApiController]
    [Route("api/[controller]")]

    public class DeliveryOrderController : ControllerBase {

        private readonly IDeliveryOrderService _deliveryOrderService;

        public DeliveryOrderController(IDeliveryOrderService deliveryOrderService) {
            _deliveryOrderService = deliveryOrderService;
        }

        [HttpGet("GetAll")]
        public ActionResult<List<OrderItem>> GetActionResult()  {
            return Ok(_deliveryOrderService.GetAllDeliveryOrders());
        }

        [HttpGet("GetOne/{id}")]
        public ActionResult<DeliveryOrder> GetSingle(int id)    {
            return Ok(_deliveryOrderService.GetDeliveryOrderById(id)); 
        }

        [HttpPost]
        public ActionResult<List<DeliveryOrder>> AddOrder(DeliveryOrder order)  {
            return Ok(_deliveryOrderService.AddDeliveryOrder(order));
        }
    }
}