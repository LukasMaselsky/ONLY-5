import { useState } from "react";
import axios from 'axios';

const milliToMin = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals 
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

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
            const length = milliToMin(data['recordings'][0]['length']) // convert from milli to mins
            const MBID = data['recordings'][0]['id']
            
            /*
            axios.defaults.baseURL = 'https://musicbrainz.org/ws/2/'
            axios.get('recording/eca8983b-9e76-4b5c-904f-2547a9c6716c').then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
            */

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