type Props = {
  className: string
  description: string
  color: string
  img: string
}

const DashboardCard = ({className, description, color, img}: Props) => (
  <div
    className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
    style={{
      backgroundColor: color,
      backgroundImage: `url('${img}')`,
    }}
  >
    <div className='card-header pt-5'>

      <div className='card-title d-flex flex-column'>
        <span className='fs-2x fw-bold text-white me-2'>Daily Fuel Sale</span>
      </div>
    </div>
    <div className='card-body d-flex align-items-center justify-content-between pt-0'>
        <div className='card-title d-flex flex-column'>
        <span className='fs-2hx fw-bold text-white me-2'>1200</span>
        <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>Liters</span>
      </div>
      <div className='card-title d-flex flex-column'>
        <span className='fs-2hx fw-bold text-white me-2'>260000</span>
        <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>Afg</span>
      </div>
    </div>
  </div>
)
export {DashboardCard}
