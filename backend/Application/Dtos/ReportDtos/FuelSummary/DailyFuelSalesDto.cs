using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Dtos.ReportDtos.FuelSummary
{
    public class DailyFuelSalesDto
    {
        public DateOnly Date { get; set; }
        public Dictionary<string, decimal> Sold { get; set; } = new();
    }
}