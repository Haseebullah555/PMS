import {useIntl} from 'react-intl'

export default function GetAllRoles({handleChange, roleSelector, currentRoles = []}) {
  const intl = useIntl()

  const isRoleChecked = (generalRoleId, currentRoles) => {
    let temp
    currentRoles.map((yrow) => {
      if (yrow == generalRoleId) {
        temp = true
      }
    })
    return temp
  }

  return (
    <div
      className='modal fade'
      id='roleModal'
      tabIndex={-1}
      aria-labelledby='roleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-xl modal-center'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='roleModalLabel'>
              {intl.formatMessage({id: 'SETTING.ROLE.ROLE_LIST'})}
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body border '>
            <ul className='m-2 row' data-columns='4'>
              {roleSelector?.data?.map((row, index) => (
                <div key={index} className='col-sm-12 col-md-3'>
                  <input
                    checked={isRoleChecked(row.id, currentRoles)}
                    type='checkbox'
                    name='permission'
                    onChange={(event) => {
                      handleChange(row.id, event, 'role')
                    }}
                  />
                  <span className='px-1'>{row.name}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'CLOSE'})}
            </button>
            <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>
              {intl.formatMessage({id: 'SAVE'})}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
