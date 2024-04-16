import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoginInfo } from '../features/login/loginSlice';

const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(setLoginInfo([loginEmail, loginPassword]))
    setLoginEmail('')
    setLoginPassword('')
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
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
      </section>
    </main>
  )
}

export default LoginPage