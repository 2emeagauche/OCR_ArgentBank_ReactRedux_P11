import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLogin, resetLogin, settingPersist } from './loginSlice'
import { fetchProfile } from '../profile/profileSlice'
import Spinner from '../../components/Spinner'
import InputBlock from '../../components/InputBlock'

const Login = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const loginStatus = useSelector(state => state.login.status)
  const profileStatus = useSelector(state => state.profile.status)
  const loginApiStatus = useSelector(state => state.login.apiStatus)
  const errorMessage = useSelector(state => state.login.error)
  const bearerToken = useSelector(state => state.login.token)

  const dispatch = useDispatch()
  const navigate= useNavigate()
  const canLogin = loginEmail !== '' && loginPassword !== '' && loginStatus !== 'loading'
  
  const onLoginSubmited = async (e) => {
    e.preventDefault()
    if(canLogin) {
      try{
        await dispatch(fetchLogin(JSON.stringify({"email": loginEmail, "password": loginPassword}))).unwrap()
      } catch(err) {
        setLoginError('Failed to login: ', err)
      }
    }
  }
  
  const remember = (e) => {
    dispatch(settingPersist(e.target.checked))
  }

  useEffect(() => {
    if(!!bearerToken) {
      navigate('/profile')
    }
  }, [navigate, bearerToken])
  
  useEffect(() => {
    if (loginApiStatus === 200) {
      const grabProfile = async () => {
        try{
          await dispatch(fetchProfile(bearerToken)).unwrap()
          dispatch(resetLogin())
          navigate('/profile')
        }
        catch(err){
          setLoginError(err)
        }
      }
      grabProfile()
    } else {
      setLoginError(errorMessage)
    }
  }, [dispatch, navigate, bearerToken, loginApiStatus, errorMessage])

  
  return (
    <>
      {
        (loginStatus === 'loading' || profileStatus === 'loading') ?
          <Spinner text="Loading..." />
        :
        <>
          <form onSubmit={onLoginSubmited}>
            <InputBlock
              classes="input-wrapper"
              type="text"
              id="email"
              label="Email"
              val={loginEmail}
              disabled={false}
              onChange={(e) => setLoginEmail(e.target.value)}
              onFocus={(e) => setLoginError('')}
              />
            <InputBlock
              classes="input-wrapper"
              type="password"
              id="password"
              label="Password"
              val={loginPassword}
              disabled={false}
              onChange={(e) => setLoginPassword(e.target.value)}
              onFocus={(e) => setLoginError('')}
              />
            <InputBlock
              classes="input-remember"
              type="checkbox"
              id="remember-me"
              label="Remember me"
              val=""
              disabled={false}
              onChange={(e) => remember(e)}
            />
            <button className="sign-in-button" type='submit' disabled={!canLogin}>Sign In</button>
          </form>
          <>
          {
          loginError ? <p className='error'>{loginError}</p> : null
          }
          </>
        </>
      }
    </>
  )
}

export default Login