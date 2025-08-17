import {Link} from 'react-router-dom'
import unAuthorizedImage from '../../../src/app/custom/assets/404-error.png'
import {useIntl} from 'react-intl'

const UnAuthorized = () => {
  const intl = useIntl()
  return (
    <div className='text-center'>
      <div className='me-7 mb-4'>
        <div className='symbol symbol-100px symbol-lg-200px symbol-fixed position-relative'>
          <img src={unAuthorizedImage} alt='Metronic' />
        </div>
      </div>
      <div className='mb-lg-8 alert alert-danger'>
        <div className='alert-text font-weight-bolder fs-1'>Un Authorized</div>
        <div className='alert-text font-weight-bolder fs-1'>
          {intl.formatMessage({id: 'GLOBAL.UNAUTHTEXT'})}
        </div>
        <div className='alert-text font-weight-bolder fs-1'>
          <Link to={'/'}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</Link>
        </div>
      </div>
    </div>
  )
}
export default UnAuthorized
