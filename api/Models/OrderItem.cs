namespace api.Models    {
    public class OrderItem {
        public int ID { get; set; }

        //default name = " No Name "
        public string Name { get; set; } = "No Name";
        public double Price { get; set; }
}
}