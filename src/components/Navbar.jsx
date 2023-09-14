import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Navbar( {playlist} ) {

    const root = document.querySelector(':root')
    const primary = getComputedStyle(root).getPropertyValue("--primary")
    const secondary = getComputedStyle(root).getPropertyValue("--secondary")
    const accent = getComputedStyle(root).getPropertyValue("--accent")

    return (
        <nav>
            <div id="nav-logo-section" className='nav-section'>
                <div className="logo">
                    <h1 className="logo-text" style={{color:accent, transform:'translate(1%, 0%)', zIndex:'-1'}}>ONLY 5</h1>
                </div>
                <div className="logo">
                    <h1 className="logo-text" style={{color:secondary, zIndex:'-1'}}>ONLY 5</h1>
                </div>
                <div className="logo">
                    <h1 className="logo-text" style={{color:primary, transform: 'translate(-1%, 0%)'}}>ONLY 5</h1>
                </div>
            </div>
            <div id="nav-home-section" className="nav-section">
                <Link to='/' className="nav-button">
                    <p>Home</p>
                </Link>
            </div>
            <div id="nav-create-section" className="nav-section">
                <Link to='/create' className="nav-button">
                    <p>Create</p>
                </Link>
            </div>
            <div id="nav-explore-section" className="nav-section">
                <Link to='/explore' className="nav-button">
                    <p>Explore</p>
                </Link>
            </div>
            <div id="nav-contact-section" className="nav-section">
                <Link to='/contact' className="nav-button">
                    <p>Contact</p>
                </Link>
            </div>
            <div id="nav-account-section" className="nav-section">
                <Link to='/account' className="nav-button" id='nav-button-account'>
                    <FontAwesomeIcon className='account' icon={faUser} style={{fontSize:'1rem',}}/>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;