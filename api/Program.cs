
using api.Services.OrderItemService;
using api.Services.TakeoutOrderService;
using api.Services.DeliveryOrderService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOrderItemService, OrderItemService>();
builder.Services.AddScoped<ITakeoutOrderService, TakeoutOrderService>();
builder.Services.AddScoped<IDeliveryOrderService, DeliveryOrderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
