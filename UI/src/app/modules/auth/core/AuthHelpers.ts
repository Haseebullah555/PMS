import {Logout} from '../Logout'
import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()

      if (auth && auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
        const tokenExpirationDate = new Date(auth.expires_at)
        const currentDate = new Date()
        try {
          if (tokenExpirationDate !== null && tokenExpirationDate <= currentDate) {
            window.location.reload()
            removeAuth()
            Logout()

            // Send a request to refresh the token using the refresh token
            // const refreshResponse = axios.post(
            //   `${process.env.REACT_APP_API_URL}api/refresh_token`,
            //   {
            //     refresh_token: auth.accessToken,
            //   }
            // )
            // const newAccessToken = refreshResponse.data.refresh_token
            // const newTokenExpiration = refreshResponse.data.expires_at
            // config.headers.Authorization = `Bearer ${refreshResponse.data.refresh_token}`
            // // Update the access token and token expiration in the storage
            // auth.accessToken = newAccessToken
            // auth.expires_at = newTokenExpiration
          } else {
            const extendedExpirationDate = new Date(currentDate.getTime() + 30 * 60000) // 30 minutes in milliseconds
            auth.expires_at = extendedExpirationDate.toISOString()
          }
        } catch (error) {
          removeAuth()
          Logout()
          // Handle token refresh failure (e.g., redirect to login page)
          window.location.reload()
          console.log('Token refresh failed:', error)
          // return Promise.reject(error)
        }
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
