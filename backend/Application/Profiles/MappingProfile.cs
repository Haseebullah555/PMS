using Application.Dtos;
using AutoMapper;
using Domain.Models;

namespace Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<FuelTypes, FuelTypeDto>().ReverseMap();
            CreateMap<FuelGun, FuelGunDto>().ReverseMap();
            CreateMap<FuelStand, FuelStandDto>().ReverseMap();
            CreateMap<FuelStand, CreateFuelStandDto>()
    .ForMember(d => d.Staffs, o => o.MapFrom(s => s.Staff));
            CreateMap<ExtraExpenses, ExtraExpensesDto>().ReverseMap();
            CreateMap<Partner, PartnerDto>().ReverseMap();
            CreateMap<PartnerTransaction, PartnerTransactionDto>().ReverseMap();
            CreateMap<Staff, StaffDto>().ReverseMap();
            CreateMap<StaffPayment, StaffPaymentDto>().ReverseMap();
            CreateMap<SupplierLoanPayment, SupplierLoanPaymentDto>().ReverseMap();
            CreateMap<Purchase, PurchaseDto>().ReverseMap();
            CreateMap<PurchaseDetail, PurchaseDetailDto>().ReverseMap();
            CreateMap<Stock, StockDto>().ReverseMap();
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Supplier, SupplierWithDetialsDto>().ReverseMap();
            CreateMap<Supplier, SuppliersWithSupplierLoanPaymentsDto>().ReverseMap();
        }
    }
}