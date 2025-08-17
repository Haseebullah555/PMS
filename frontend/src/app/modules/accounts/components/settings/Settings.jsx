import React, {useEffect} from 'react'
import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
import {ConnectedAccounts} from './cards/ConnectedAccounts'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'
import {DeactivateAccount} from './cards/DeactivateAccount'
import {useDispatch, useSelector} from 'react-redux'
import {getProfile} from '../../../../../redux/slices/authenticationSlices/authenticationSlice'

export function Settings() {
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.authentication.profile
  })

  useEffect(() => {
    if (!data) {
      dispatch(getProfile())
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  return (
    <>
      <ProfileDetails data={data} />
      <SignInMethod data={data} />
      {/* <ConnectedAccounts /> */}
      {/* <EmailPreferences /> */}
      {/* <Notifications /> */}
      {/* <DeactivateAccount data={data} /> */}
    </>
  )
}
