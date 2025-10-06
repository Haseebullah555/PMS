import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
const ModulesItem = () => {
  return (
    <>
      <div>
        <Link className={`fw-bold text-primary text-hover-primary fs-4 `} to="/library/book/list">
        <div className='col-xl-3 col-md-3 col-sm-6'>
          <div className='card card-xl-stretch dashboard-item'>
            <div className='card-body'>
              <div className='d-flex align-items-center rounded p-5'>
                <h3>User Management</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
      </div>
      <div>
      <Link className={`fw-bold text-primary text-hover-primary fs-4 `} to="/library/book/list">
        <div className='col-xl-3 col-md-3 col-sm-6'>
          <div className='card card-xl-stretch dashboard-item'>
            <div className='card-body'>
              <div className='d-flex align-items-center rounded p-5'>
                <h3>User Management</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
      </div>
    </>
  )
}
export default ModulesItem
