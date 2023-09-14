import { useState, useEffect, useContext } from 'react';
import { Visibility } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios';
import Explicit from '../../components/Explicit';

const milliToMin = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals 
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

function ChooseSong({ playlist, setPlaylist, search}) {

    const [selection, setSelection] = useState(null)
    const vis = useContext(Visibility)
    const [isChoosing, setIsChoosing] = useState(false) //* var to know if song is being chosen to prevent spamming of search button
    const [isLoading, setIsLoading] = useState(false)

    const [token, setToken] = useState('')

    const spotify = {
        ClientId: 'cb20116d67d6469fb4ea1b43fd8a1768',
        ClientSecret: 'd3d27af19bf54837834de2df497db0ae'
    }

    useEffect(() => {
        //! this if statement to prevent firing on initialization of search when it is null
        if (search != null && !isChoosing && playlist.length < 5) {
            setIsChoosing(true)
            setIsLoading(true)
            vis.setIsPopupVis(true)
              
            axios('https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
            })
            .then(tokenResponse => {      
                setToken(tokenResponse.data.access_token);

                axios('https://api.spotify.com/v1/search?q=' + search.title + '&type=track&market=ES&limit=5&offset=0', {
                    method: 'GET',
                    headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
                })
                .then (response => {   
                    //console.log(response)     
                    let data = response['data']['tracks']['items']
                    data.sort((a, b) => b.popularity - a.popularity) // sort by highest popularity
                    setSelection(data)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        
        }
    }, [search]);

        
        
    const chooseAddition = (title, artist, length, cover, explicit) => {
        // update playlist with new song after selection from options
        setPlaylist((prevItems) => [...prevItems, {
            title: title, 
            artist: artist, 
            id: playlist.length !== 0 ? playlist[playlist.length - 1].id + 1 : 0, // if array not empty
            length: length,  
            coverArt: cover,
            explicit: explicit,
        }])
        //! HIDE POPUP
        vis.setIsPopupVis(false) 
        setIsChoosing(false)  
    }

    const exitChoosing = () => {
        vis.setIsPopupVis(false) 
        setIsChoosing(false)
        setIsLoading(false)
    }

    const getArtistNames = (arr) => {
        return arr.map((artist) => artist.name).join(', ')
    }

    return (   
        <div className="choose-song" style={{display:(vis.isPopupVis) ? 'flex' : 'none'}}>
            <FontAwesomeIcon className='exit' icon={faX} style={{color: "#000000",}} onClick={exitChoosing}/>
            <ScaleLoader
                color={getComputedStyle(document.querySelector(':root')).getPropertyValue("--background")}
                loading={isLoading}
                height={75}
                width={8}
                radius={4}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            
            <div className="choose-song-wrapper" style={{'display': (isLoading) ? 'none' : 'inline'}}>
                <h1 className='choose-song-heading'>Choose song to add</h1>
                {selection && selection.map(song => (
                <div className='song popup' onClick={() => chooseAddition(song['name'], getArtistNames(song['artists']), milliToMin(song['duration_ms']), song['album']['images'][0]['url'], song['explicit'])} key={song.id}>
                    <img className='cover-art' src={song['album']['images'][0]['url']}></img>

                    <div className='song-info'>  
                        <p className="song-title choose" style={{fontSize:'1.5rem'}}>{song['name']}</p>
                        <div style={{display:'flex', flexDirection:'row', gap:'0.4rem'}}>
                            <Explicit style={{display: song.explicit ? 'inline-block' : 'none', height:'1rem'}}/>
                            <p className="song-artist choose">{getArtistNames(song['artists'])}</p>
                        </div>
                    </div>
                    <div className='song-length'>
                        <p>{song['duration_ms'] !== undefined ? milliToMin(song['duration_ms']) : '-'}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseSong;