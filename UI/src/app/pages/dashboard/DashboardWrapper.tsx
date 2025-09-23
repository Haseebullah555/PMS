/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, memo} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import ModulesItem from '../../modules/reusable-components/ModulesItem'
import {connect} from 'react-redux'
import {useAuth} from '../../modules/auth'
import {useTranslation} from 'react-i18next'

const DashboardWrapper: FC = () => {
  const {currentUser} = useAuth()
  const {t} = useTranslation()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('global.dashboard')}</PageTitle>
      <div className='row gy-5 g-xl-8'>
         <ModulesItem
           
          />
        {/* {currentUser?.systems.map((system: any, i: number) => (
          <ModulesItem
            key={i} // Ensure you provide a unique key when mapping elements
            title={system.name_da}
            text={system.name_da}
            link={system.route}
            icon={system.icon}
          />
        ))} */}
      </div>
    </>
  )
}

const arePropsEqual = (prevProps: any, nextProps: any) => {
  // Check if the user's systems array remains the same to decide whether to re-render
  return prevProps.user.systems === nextProps.user.systems
}
//@ts-expect-error
export default connect((state) => ({user: state.user}))(memo(DashboardWrapper, arePropsEqual))
