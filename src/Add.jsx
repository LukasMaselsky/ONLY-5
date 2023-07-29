import { useState } from "react";
import axios from 'axios';


function Add({ playlist, setPlaylist}) {

    const [artistSearch, setArtistSearch] = useState('')
    const [titleSearch, setTitleSearch] = useState('')

    

    const handleAdd = (e) => {
        e.preventDefault();
        const baseURL = 'https://musicbrainz.org/ws/2/recording?query='
        
        

        axios.defaults.baseURL = baseURL
        axios.get('artist=' + artistSearch + '%20AND%20recording=' + titleSearch)
        .then((res) => {
            const myJSON = JSON.stringify(res.data)
            const data = JSON.parse(myJSON)

            const artist = data['recordings'][0]['artist-credit'][0]['name']
            const title = data['recordings'][0]['title']
            const length = data['recordings'][0]['length']
            
            // update playlist with searched song info
            setPlaylist((prevItems) => [...prevItems, {
                title: title, artist: artist, id: (playlist[playlist.length - 1].id + 1), length: length,  coverArt:null
            }])
            
        }).catch((err) => {
            console.log(err)
        })
        
    }

    return (
        <div className="search">
            <input className='artist-search' placeholder='artist' value={artistSearch} onInput={e => setArtistSearch(e.target.value)}/> 
            <input className='title-search' placeholder='title' value={titleSearch} onInput={e => setTitleSearch(e.target.value)}/>
            <button onClick={handleAdd}>Submit</button>
        </div>
    )
}

export default Add;