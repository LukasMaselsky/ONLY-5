import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Searchbar({ search, setSearch}) {
    const [titleSearch, setTitleSearch] = useState('')
    

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch({title:titleSearch})
    }

    return (
        <div className="search">
            <div></div> {/* empty div for grid cetnering to work */}
            <input className='title-search' placeholder='Search for a song' value={titleSearch} onInput={e => setTitleSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch(e)}/>
            <FontAwesomeIcon className='search-button' icon={faMagnifyingGlass} style={{color: "#ffffff",}} onClick={handleSearch}/>
        </div>
    )
}

export default Searchbar;