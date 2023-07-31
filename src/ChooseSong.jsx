import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const milliToMin = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals 
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

function ChooseSong({ playlist, setPlaylist, search, setSearch}) {

    const [selection, setSelection] = useState(null)

    useEffect(() => {
        //! this if statement to prevent firing on initialization of search when it is null
        if (search != null) {
            const baseURL = 'https://musicbrainz.org/ws/2/recording?query='
                
            axios.defaults.baseURL = baseURL
            axios.get('artist=' + search.artist + '%20AND%20recording=' + search.title)
            .then((res) => {
                const myJSON = JSON.stringify(res.data)
                const data = JSON.parse(myJSON)
                console.log(data['recordings'].slice(0, 5))
                setSelection(data['recordings'].slice(0, 5))
                //* these results will be the ones the user chooses from
                

                /*
                const artist = data['recordings'][0]['artist-credit'][0]['name']
                const title = data['recordings'][0]['title']
                const length = milliToMin(data['recordings'][0]['length']) // convert from milli to mins
                const MBID = data['recordings'][0]['id']
                */
                //cover art
                /*
                axios.defaults.baseURL = 'https://musicbrainz.org/ws/2/'
                axios.get('recording/eca8983b-9e76-4b5c-904f-2547a9c6716c').then((res) => {
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
                */
                
            }).catch((err) => {
                console.log(err)
            })

        }
    }, [search]);

        
        
    const chooseAddition = (title, artist, length) => {
        // update playlist with new song after selection from options
        setPlaylist((prevItems) => [...prevItems, {
            title: title, artist: artist, id: (playlist[playlist.length - 1].id + 1), length: length,  coverArt:null
        }])
        //! HIDE POPUP
    }

    return (
        <div className="choose-song">
            <div className="choose-song-wrapper">
                {selection && selection.map(song => (
                <div className='song' onClick={() => chooseAddition(song['title'], song['artist-credit'][0]['name'], milliToMin(song['length']))} key={song.id}>
                    <div className='song-info'>
                        <div className="song-title">
                            <p>{song['title']}</p>
                        </div>
                        <div className="song-artist">
                            <p>{song['artist-credit'][0]['name']}</p>
                        </div>
                    </div>
                    <div className='song-length'>
                        <p>{milliToMin(song['length'])}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseSong;