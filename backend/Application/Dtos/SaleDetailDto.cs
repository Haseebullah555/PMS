using Application.Dtos.Common;

namespace Application.Dtos
{
    public class SaleDetailDto : BaseDto
    {
        public int SaleId { get; set; }
        public string? Sale { get; set; }

        public int StockId { get; set; }
        public string? Stock { get; set; }

        public int GoodId { get; set; }
        public string? Good { get; set; }

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}