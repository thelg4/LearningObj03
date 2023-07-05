namespace api.Models    {
    public class DeliveryOrder  {
        public int Id { get; set;}
        public string? Name { get; set;}
        public string? Address { get; set;}
        public List<OrderItem>? OrderItems { get; set;}
        public double SubTotal { get; set;}
    }
}