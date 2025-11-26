// import {useSelector} from 'react-redux'

// export default function UserCan(system_permissions = []) {
//   const permissions = useSelector((state) => {
//     return state?.auth?.userDetail?.permissions
//   })

//   function check() {
//     const result = permissions.map((permission) => {
//       return system_permissions.includes(`${permission.name}`)
//     })
//     if (result.length === 0) {
//       return false
//     } else {
//       return result
//     }
//   }
//   return check()
// }

// import {useSelector} from 'react-redux'

export default function UserCan(system_permissions = [], userPermissions = []) {
  // const permissions = useSelector((state) => {
  //   return state?.auth?.userDetail?.user?.permissions
  // })

  function check() {
    const result = userPermissions.some((permission) => {
      return system_permissions.includes(`${permission.name}`)
    })

    return result
  }

  return check()
}
