using Application.Dtos;
using Application.Dtos.CustomerDtos;
using Application.Dtos.CustomerLoanDtos;
using Application.Dtos.CustomerLoanPaymentDtos;
using Application.Dtos.DailyFuelSellDtos;
using Application.Dtos.ExtraExpenseDtos;
using Application.Dtos.FuelDistributionDtos;
using Application.Dtos.FuelGunDtos;
using Application.Dtos.FuelStandDtos;
using Application.Dtos.FuelTypeDtos;
using Application.Dtos.PurchaseDtos;
using Application.Dtos.StaffDtos;
using Application.Dtos.StaffPaymentDtos;
using Application.Dtos.StockDtos;
using Application.Dtos.SupplierDtos;
using Application.Dtos.SupplierLoanPaymentDtos;
using AutoMapper;
using Domain.Models;

namespace Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<Supplier, AddSupplierDto>().ReverseMap();
            CreateMap<Supplier, UpdateSupplierDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Customer, AddCustomerDto>().ReverseMap();
            CreateMap<Customer, UpdateCustomerDto>().ReverseMap();
            CreateMap<CustomerLoan, CustomerLoanDto>().ReverseMap();
            CreateMap<FuelType, FuelTypeDto>().ReverseMap();
            CreateMap<FuelType, AddFuelTypeDto>().ReverseMap();
            CreateMap<FuelType, UpdateFuelTypeDto>().ReverseMap();
            CreateMap<FuelGun, FuelGunDto>().ReverseMap();
            CreateMap<FuelGun, FuelGunListDto>().ReverseMap();
            CreateMap<FuelStand, FuelStandDto>().ReverseMap();
            CreateMap<FuelStand, CreateFuelStandDto>();
            CreateMap<ExtraExpenses, ExtraExpensesDto>().ReverseMap();
            CreateMap<ExtraExpenses, AddExtraExpenseDto>().ReverseMap();
            CreateMap<ExtraExpenses, UpdateExtraExpenseDto>().ReverseMap();
            CreateMap<Partner, PartnerDto>().ReverseMap();
            CreateMap<PartnerTransaction, PartnerTransactionDto>().ReverseMap();
            CreateMap<Staff, StaffDto>().ReverseMap();
            CreateMap<Staff, AddStaffDto>().ReverseMap();
            CreateMap<Staff, UpdateStaffDto>().ReverseMap();
            CreateMap<StaffPayment, StaffPaymentDto>().ReverseMap();
            CreateMap<SupplierLoanPayment, SupplierLoanPaymentDto>().ReverseMap();
            CreateMap<SupplierLoanPayment, AddSupplierLoanPayment>().ReverseMap();
            CreateMap<Purchase, PurchaseDto>().ReverseMap();
            CreateMap<Purchase, AddPurchaseDto>().ReverseMap();
            CreateMap<Purchase, UpdatePurchaseDto>().ReverseMap();
            CreateMap<PurchaseDetail, PurchaseDetailDto>().ReverseMap();
            CreateMap<Stock, StockDto>().ReverseMap();
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Supplier, SupplierWithDetialsDto>().ReverseMap();
            CreateMap<Supplier, SuppliersWithSupplierLoanPaymentsDto>().ReverseMap();
            CreateMap<FuelStand, GetFuelStandWithDetialsDto>().ReverseMap();
            CreateMap<FuelStand, UpdateFuelStandDto>().ReverseMap();
            CreateMap<FuelGun, GetFuelGunWithFuelDistributionDto>().ReverseMap();
            CreateMap<DailyFuelSell, DailyFuelSellDto>().ReverseMap();
            CreateMap<DailyFuelSell, AddDailyFuelSellDto>().ReverseMap();
            CreateMap<DailyFuelSell, UpdateDailyFuelSellDto>().ReverseMap();

            CreateMap<Customer, CustomersWithDetailsDto>().ReverseMap();
            CreateMap<Customer, CustomerLoanDto>().ReverseMap();
            CreateMap<Customer, CustomerLoanPaymentDto>().ReverseMap();
            CreateMap<CustomerLoan, AddCustomerLaonDto>().ReverseMap();
        }
    }
}