import { useEffect, useState } from "react"

function Welcome({ playlist }) {

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
        <div style={{display: (playlist.length < 1) ? 'inline' : 'none'}}>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:accent, transform: (!pageLoaded) ? 'translate(50%, 50%)' : 'translate(1%, 0%)', zIndex:'-1'}}>ONLY 5</h1>
            </div>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:secondary, zIndex:'-1'}}>ONLY 5</h1>
            </div>
            <div className="welcome">
                <h1 className="welcome-text" style={{color:primary, transform: (!pageLoaded) ? 'translate(-50%, -50%)' : 'translate(-1%, 0%)'}}>ONLY 5</h1>
            </div>
        </div>

        </>
    )
}

export default Welcome;