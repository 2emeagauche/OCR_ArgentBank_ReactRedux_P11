import mainNavLogoImg from '../assets/images/argentBankLogo.png'
import { Link } from 'react-router-dom'

const Header = () => {
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
      <div>
        <Link to="/signin" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          &nbsp;Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Header