import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
const ModulesItem = () => {
  return (
    <div className='col-xl-4 col-md-6 col-sm-6'>
      <div className='card card-xl-stretch mb-5 mb-xl-8 dashboard-item'>
        <div className='card-header border-0'>
          <h3 className='card-title fw-bold text-dark'>project 1</h3>
          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            >
              {/* <img src={toAbsoluteUrl('/media/images/' + icon)} alt='test' className='h-35px' /> */}
            </button>
          </div>
        </div>
        <div className='card-body pt-0'>
          <div className='d-flex align-items-center bg-light-info rounded p-5'>
            {/* <img src={toAbsoluteUrl('/media/images/' + icon)} alt='test' className='h-30px me-2' /> */}
            <div className='flex-grow-1 me-2'>
              <Link className={`fw-bold text-primary text-hover-primary fs-4 `} to="/library/book/list">
                project 1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModulesItem
