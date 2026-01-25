namespace Application.Dtos.Dashboard
{
    public class DashboardDailySalesDto
    {
         public int FuelTypeId { get; set; }
        public string FuelTypeName { get; set; }
        public int Today { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalSoldAmount { get; set; }
    }
}