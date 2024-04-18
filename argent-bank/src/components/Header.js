import mainNavLogoImg from '../assets/images/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

  const {userName} = useSelector(state => state.profile)

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

        userName ? 

        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {userName}
          </Link>
          <Link className="main-nav-item" to="/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
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