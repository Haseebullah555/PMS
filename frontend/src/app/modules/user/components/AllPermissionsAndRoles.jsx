import SetLang from '../../../custom/SetLang'

export default function AllPermissionsAndRoles({user, permissions_by_roles}) {
  return (
    <>
      {user.permissions.length != 0 && (
        <>
          <div className='border border-primary rounded mb-10 '>
            <div className='m-2 text-center bg bg-dark text-white py-2 h5 rounded'>
              {SetLang('direct permissions list')}
            </div>
            <ul className='m-4 row' data-columns='1'>
              {user.permissions.map((row, index) => (
                <div key={index} className='col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                  <input type='checkbox' checked readOnly />
                  <span className='px-1'>{row.name}</span>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
      {user.roles.length != 0 && (
        <>
          <div className='border border-primary rounded mb-10 '>
            <div className='m-2 text-center bg bg-dark text-white py-2 h5 rounded'>
              {SetLang('roles list')}
            </div>
            <ul className='m-4 row' data-columns='1'>
              {user.roles.map((row, index) => (
                <div key={index} className='col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                  <input type='checkbox' checked readOnly />
                  <span className='px-1'>{row.name}</span>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
      {permissions_by_roles.length != 0 && (
        <>
          <div className='border border-primary rounded mb-10'>
            <div className='m-2 text-center bg bg-dark text-white py-2 h5 rounded'>
              {SetLang('permissions by roles')}
            </div>
            <ul className='m-4 row' data-columns='1'>
              {permissions_by_roles.map((row, index) => (
                <div key={index} className='col-sm-6 col-md-4 col-lg-3 col-xl-3'>
                  <input type='checkbox' checked readOnly />
                  <span className='px-1'>{row.name}</span>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
