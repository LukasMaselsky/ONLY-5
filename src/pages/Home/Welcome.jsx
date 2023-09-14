import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Welcome() {

    const root = document.querySelector(':root')
    const primary = getComputedStyle(root).getPropertyValue("--primary")
    const secondary = getComputedStyle(root).getPropertyValue("--secondary")
    const accent = getComputedStyle(root).getPropertyValue("--accent")

    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        setPageLoaded(true)
    }, [])


    return (
        <>
        <div style={{height:'100vh', overflow:'hidden', position:'relative'}}>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:accent, transform: (!pageLoaded) ? 'translate(50%, 50%)' : 'translate(1%, 0%)', zIndex:'-1'}}>ONLY 5</h1>
            </div>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:secondary, zIndex:'-1'}}>ONLY 5</h1>
            </div>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:primary, transform: (!pageLoaded) ? 'translate(-50%, -50%)' : 'translate(-1%, 0%)'}}>ONLY 5</h1>
            </div>
            <div className='enter-link'>
                <Link to='/create'>
                    ENTER
                </Link>
             </div>
        </div>
        </>
    )
}

export default Welcome;