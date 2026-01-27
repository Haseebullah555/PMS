using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Contracts.Interfaces.Common;
using Domain.Models;

namespace Application.Contracts.Interfaces
{
    public interface ICustomerLoanRepository : IGenericRepository<CustomerLoan>
 {
     public Task<CustomerLoan?> GetCustomerLoanByIdAsync(int customerLoanId);
 }
}