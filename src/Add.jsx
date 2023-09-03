import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Add({ search, setSearch}) {
    const [titleSearch, setTitleSearch] = useState('')
    

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch({title:titleSearch})
    }

    return (
        <div className="search">
            <input className='title-search' placeholder='Search for song' value={titleSearch} onInput={e => setTitleSearch(e.target.value)}/>
            <FontAwesomeIcon className='search-button' icon={faMagnifyingGlass} style={{color: "#ffffff",}} onClick={handleSearch}/>
        </div>
    )
}

export default Add;