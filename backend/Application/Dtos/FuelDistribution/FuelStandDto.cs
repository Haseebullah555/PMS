namespace Application.Dtos.FuelDistribution
{
    public class FuelStandDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StaffId { get; set; }
        public StaffDto? Staffs { get; set; }
        public ICollection<FuelGunDto> FuelGuns { get; set; } = new List<FuelGunDto>();
    }
}