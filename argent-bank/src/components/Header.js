import mainNavLogoImg from '../assets/images/argentBankLogo.webp'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { resetProfile } from '../features/profile/profileSlice'
import { resetLogin, nukeToken, settingPersist } from '../features/login/loginSlice'

const Header = () => {

  const {userName} = useSelector(state => state.profile)
  const bearerToken = useSelector(state => state.login.token)

  const dispatch = useDispatch()

  const signingOut = () => {
    dispatch(resetProfile())
    dispatch(resetLogin())
    dispatch(nukeToken())
    dispatch(settingPersist(false))
    localStorage.clear()
  }

  return(
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={mainNavLogoImg}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {

        bearerToken ? 

        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            <span>&nbsp;{userName}</span>
          </Link>
          <button className="main-nav-item" onClick={signingOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>

        :
        
        <div>
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            &nbsp;Sign In
          </Link>
        </div>
      }
    </nav>
  )
}

export default Header