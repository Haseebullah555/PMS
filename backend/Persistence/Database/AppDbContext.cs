using Domain.Models;
using Domain.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            UserSeeder.Seed(modelBuilder);
        }
        #region DbSets
        public DbSet<User> Users { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<FuelTypes> FuelTypes { get; set; }
        public DbSet<FuelGun> FuelGuns { get; set; }
        public DbSet<FuelStand> FuelStands { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseDetail> PurchaseDetails { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SaleDetails { get; set; }
        public DbSet<SupplierLoan> SupplierLoans { get; set; }
        public DbSet<SupplierLoanPayment> SupplierLoanPayments { get; set; }
        public DbSet<CustomerLoan> CustomerLoans { get; set; }
        public DbSet<CustomerLoanPayment> CustomerLoanPayments { get; set; }
        public DbSet<FinancialTransaction> FinancialTransactions { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<StaffPayment> StaffPayments { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ExtraExpenses> ExtraExpenses { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<PartnerTransaction> PartnerTransactions { get; set; }
        public DbSet<ProfitSharing> ProfitSharings { get; set; }
        public DbSet<ProfitSharingAgreement> ProfitSharingAgreements { get; set; }
        public DbSet<Student> Students { get; set; }

        #endregion
    }
}
