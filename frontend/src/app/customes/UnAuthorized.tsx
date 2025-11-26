import {Link} from 'react-router-dom'
// import unAuthorizedImage from '../../../src/_metronic/assets/images/restricted.jpg'
import SetLang from '../custom/SetLang'
const UnAuthorized = () => {
  return (
    <div className='text-center'>
      <div className='me-7 mb-4'>
        <div className='symbol symbol-100px symbol-lg-200px symbol-fixed position-relative'>
          {/* <img src={unAuthorizedImage} alt='Metronic' /> */}
        </div>
      </div>
      <div className='mb-lg-8 alert alert-danger'>
        <div className='alert-text font-weight-bolder fs-1'>{SetLang('global.UNAUTHTITLE')}</div>
        <div className='alert-text font-weight-bolder fs-1'>{SetLang('global.UNAUTHTEXT')}</div>
        <div className='alert-text font-weight-bolder fs-1'>
          <Link to={'/'}>{SetLang('global.UNAUTHBACK')}</Link>
        </div>
      </div>
    </div>
  )
}
export default UnAuthorized
