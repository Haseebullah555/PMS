using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Common;

namespace Application.Dtos
{
    public class CustomerLoanDto : BaseDto
    {
        public int CustomerId { get; set; }
        public int FuelTypeId { get; set; }
        public decimal FuelAmount { get; set; }
        public decimal FuelUnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime LoanDate { get; set; }
        public String? Description { get; set; }
    }
}