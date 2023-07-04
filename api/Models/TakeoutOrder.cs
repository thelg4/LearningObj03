namespace api.Models{

    public class TakeoutOrder   {
        public int ID { get; set; }
        public string Name { get; set; } = " No name ";
        public List<OrderItem>? orderItems { get; set;}  
    }
}