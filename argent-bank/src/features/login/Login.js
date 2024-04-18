import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from './loginSlice'
import { fetchProfile } from '../profile/profileSlice'
import Spinner from '../../components/Spinner'

const Login = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginStatus = useSelector(state => state.login.status)
  const loginApiStatus = useSelector(state => state.login.apiStatus)
  const errorMessage = useSelector(state => state.login.error)
  const bearerToken = useSelector(state => state.login.token)

  const dispatch = useDispatch()
  const navigate= useNavigate()

  const canLogin =
    [loginEmail, loginPassword].every(Boolean) && loginStatus === 'idle'

  const onLoginSubmited = async (e) => {
    e.preventDefault()
    if(canLogin) {
      try{
        await dispatch(fetchLogin(JSON.stringify({"email": loginEmail, "password": loginPassword}))).unwrap()
      } catch(err) {
        console.error('Failed to login: ', err)
      }
    }
  }
  
  useEffect(() => {
    const grabProfile = async () => {
    if (loginApiStatus === 200) {
      try{
        await dispatch(fetchProfile(bearerToken)).unwrap
        navigate('/profile')
      }
      catch(err){
        console.log(err)
      }
    }}
    grabProfile()
  }, [dispatch, navigate, bearerToken, loginApiStatus])

  let content = <>
      <form onSubmit={onLoginSubmited}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type='submit'>Sign In</button>
      </form>
      {errorMessage?<p>{errorMessage}</p>:null}
    </>

  if(loginStatus === 'loading') {
    content = <Spinner text="Loading..." />
  }
  
  return (
    <>
      {content}
    </>
  )
}

export default Login