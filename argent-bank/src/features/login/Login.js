import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from './loginSlice'
import { fetchProfile } from '../profile/profileSlice'
import Spinner from '../../components/Spinner';

const Login = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginStatus = useSelector(state => state.login.status)
  const loginApiStatus = useSelector(state => state.login.apiStatus)
  const errorMessage = useSelector(state => state.login.error)
  const bearerToken = useSelector(state => state.login.token)

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(fetchLogin(JSON.stringify({"email": loginEmail, "password": loginPassword})))
  }

  let content = <>
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
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
      {errorMessage?<p>{errorMessage}</p>:<></>}
    </>

  if(loginStatus === 'loading') {
    content = <Spinner text="Loading..." />
  }
  if (loginApiStatus === 200) {
    dispatch(fetchProfile(bearerToken))
    content = <p>Login successful. Doit envoyer un dispatch fetchProfile avec le token</p>
  }
  
  return (
    <>
      {content}
    </>
  )
}

export default Login