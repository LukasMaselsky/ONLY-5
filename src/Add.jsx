import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
            <FontAwesomeIcon className='search-button' icon={faMagnifyingGlass} style={{color: "#ffffff",}} onClick={handleSearch}/>
        </div>
    )
}

export default Add;