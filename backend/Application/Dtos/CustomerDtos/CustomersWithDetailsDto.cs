using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.CustomerLoanDtos;
using Application.Dtos.CustomerLoanPaymentDtos;

namespace Application.Dtos.CustomerDtos
{
    public class CustomersWithDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public decimal Balance { get; set; } = 0m;
        public List<CustomerLoanDto>? CustomerLoans { get; set; }
        public List<CustomerLoanPaymentDto>? CustomerLoanPayments { get; set; }

    }
}