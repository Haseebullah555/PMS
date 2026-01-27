using Domain.Common;

namespace Domain.Models
{
    public class CustomerLoan : BaseDomainEntity
 {
     public int CustomerId { get; set; }
     public Customer? Customer { get; set; }
     public int FuelTypeId { get; set; } // نوع تیل
     public FuelType? FuelType { get; set; }
     public decimal FuelAmount { get; set; } // مقدار تیل فروخته شده
     public decimal FuelUnitPrice { get; set; } // نرخ واحد تیل
     public decimal TotalPrice { get; set; } // قیمت مجموعی
     public DateOnly LoanDate { get; set; }
     public string? Description { get; set; }
 }
}