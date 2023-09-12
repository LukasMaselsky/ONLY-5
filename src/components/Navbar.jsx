import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Navbar( {playlist} ) {

    const root = document.querySelector(':root')
    const primary = getComputedStyle(root).getPropertyValue("--primary")
    const secondary = getComputedStyle(root).getPropertyValue("--secondary")
    const accent = getComputedStyle(root).getPropertyValue("--accent")

    return (
        <nav style={{display: (playlist.length > 0) ? 'flex' : 'none'}}>
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
            <div id="nav-create-section" className="nav-section">
                <a className="nav-button">
                    <p>Create</p>
                </a>
            </div>
            <div id="nav-explore-section" className="nav-section">
                <a className="nav-button">
                    <p>Explore</p>
                </a>
            </div>
            <div id="nav-contact-section" className="nav-section">
                <a className="nav-button">
                    <p>Contact</p>
                </a>
            </div>
            <div id="nav-account-section" className="nav-section">
                <a className="nav-button" id='nav-button-account'>
                    <FontAwesomeIcon className='account' icon={faUser} style={{fontSize:'1rem',}}/>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;