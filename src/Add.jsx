import { useState, useContext } from "react";

function Add({ search, setSearch}) {
    const [artistSearch, setArtistSearch] = useState('')
    const [titleSearch, setTitleSearch] = useState('')
    

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch({artist:artistSearch, title:titleSearch})

    }

    return (
        <div className="search">
            <input className='artist-search' placeholder='artist' value={artistSearch} onInput={e => setArtistSearch(e.target.value)}/> 
            <input className='title-search' placeholder='title' value={titleSearch} onInput={e => setTitleSearch(e.target.value)}/>
            <button onClick={handleSearch}>Submit</button>
        </div>
    )
}

export default Add;