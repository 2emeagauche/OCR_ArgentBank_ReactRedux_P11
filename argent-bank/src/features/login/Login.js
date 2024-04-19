import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLogin, resetLogin } from './loginSlice'
import { fetchProfile } from '../profile/profileSlice'
import Spinner from '../../components/Spinner'
import InputBlock from '../../components/InputBlock'

const Login = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginStatus = useSelector(state => state.login.status)
  const profileStatus = useSelector(state => state.profile.status)
  const loginApiStatus = useSelector(state => state.login.apiStatus)
  const errorMessage = useSelector(state => state.login.error)
  const bearerToken = useSelector(state => state.login.token)
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const canLogin = [loginEmail, loginPassword].every(Boolean) && loginStatus === 'idle'
  
  const onLoginSubmited = async (e) => {
    e.preventDefault()
    if(canLogin) {
      try{
        await dispatch(fetchLogin(JSON.stringify({"email": loginEmail, "password": loginPassword}))).unwrap()
      } catch(err) {
        console.error('Failed to login: ', err)
      }
      finally{
        dispatch(resetLogin())
      }
    }
  }
  
  useEffect(() => {
    const grabProfile = async () => {
    if (loginApiStatus === 200) {
      try{
        await dispatch(fetchProfile(bearerToken)).unwrap()
        navigate('/profile')
      }
      catch(err){
        console.log(err)
      }
    }}
    grabProfile()
  }, [dispatch, navigate, bearerToken, loginApiStatus])

  
  return (
    <>
      {
        (loginStatus === 'loading' || profileStatus === 'loading') ?
          <Spinner text="Loading..." />
        :
        <form onSubmit={onLoginSubmited}>
          <InputBlock
            classes="input-wrapper"
            type="text"
            id="email"
            label="Email"
            val={loginEmail}
            disabled={false}
            onChange={(e) => setLoginEmail(e.target.value)}
            />
          <InputBlock
            classes="input-wrapper"
            type="password"
            id="password"
            label="Password"
            val={loginPassword}
            disabled={false}
            onChange={(e) => setLoginPassword(e.target.value)}
            />
          <InputBlock
            classes="input-remember"
            type="checkbox"
            id="remember-me"
            label="Remember me"
            val=""
            disabled={false}
            onChange={()=>{}}
          />
          <button className="sign-in-button" type='submit'>Sign In</button>
        </form>
      }
      {
        errorMessage ? <p>{errorMessage}</p> : null
      }
    </>
  )
}

export default Login