namespace API_Backend.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantidade { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime DataVenda { get; set; }
    }
}
