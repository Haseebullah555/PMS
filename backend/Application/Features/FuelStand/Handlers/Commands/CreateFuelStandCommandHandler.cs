using Application.Contracts.Interfaces.Common;
using Application.Features.FuelStand.Commands.Queries;
using AutoMapper;
using MediatR;

namespace Application.Features.FuelStand.Handlers.Commands
{
   public class CreateFuelStandCommandHandler : IRequestHandler<CreateFuelStandCommand>
{
    private readonly IUnitOfWork _unitOfWork;

    public CreateFuelStandCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateFuelStandCommand request, CancellationToken cancellationToken)
    {
        // Create FuelStand entity
        var fuelStand = new Domain.Models.FuelStand
        {
            Name = request.CreateFuelStandDto.Name,
            StaffId = request.CreateFuelStandDto.StaffId,
            FuelGuns = new List<Domain.Models.FuelGun>()  // initialize list
        };

        // Add FuelGuns
        foreach (var gun in request.CreateFuelStandDto.FuelGuns)
        {
            fuelStand.FuelGuns.Add(new Domain.Models.FuelGun
            {
                Name = gun.Name,
                // FuelTypeId = gun.FuelTypeId
            });
        }

        // Save to DB
        await _unitOfWork.FuelStands.AddAsync(fuelStand);
        await _unitOfWork.SaveAsync(cancellationToken);
    }
}

}