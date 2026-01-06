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
        public decimal Amount { get; set; }
        public DateTime LoanDate { get; set; }
        public bool? IsSettled { get; set; }
    }
}