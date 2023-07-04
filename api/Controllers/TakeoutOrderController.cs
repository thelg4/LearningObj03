using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Services.TakeoutOrderService;

namespace api.Controllers   {

    [ApiController]
    [Route("api/[controller]")]
    public class TakeoutOrderController : ControllerBase {

        private readonly ITakeoutOrderService _takeoutOrderService;

        public TakeoutOrderController(ITakeoutOrderService takeoutOrderService) {
            _takeoutOrderService = takeoutOrderService;
        }

        //GetAll
        [HttpGet("GetAll")]
        public ActionResult<List<TakeoutOrder>> GetActionResult()   {
            return Ok(_takeoutOrderService.GetAllTakeoutOrders());
        }

        //GetOne
        [HttpGet("GetOne/{id}")]
        public ActionResult<TakeoutOrder> GetSingle(int id) {
            return Ok(_takeoutOrderService.GetTakeoutOrderById(id));
        }

        // Add order
        [HttpPost]
        public ActionResult<List<TakeoutOrder>> AddOrder(TakeoutOrder order)    {
            return Ok(_takeoutOrderService.AddTakeoutOrder(order));
        }
    }
}