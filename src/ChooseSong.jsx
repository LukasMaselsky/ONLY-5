import { useState, useEffect, useContext } from 'react';
import { Visibility } from "./App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

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

    useEffect(() => {
        //! this if statement to prevent firing on initialization of search when it is null
        if (search != null && !isChoosing) {
            setIsChoosing(true)
            const baseURL = 'https://musicbrainz.org/ws/2/recording?query='
                
            axios.defaults.baseURL = baseURL
            axios.get('artist=' + search.artist + '%20AND%20recording=' + search.title)
            .then((res) => {
                // !SHOW POPUP HERE WHEN RESPONSE RECEIVED
                vis.showPopup()

                const myJSON = JSON.stringify(res.data)
                const data = JSON.parse(myJSON)
                // filter out music videos
                let slicedData = []
                let j = 0
                while (slicedData.length < 5) {
                    if (!data['recordings'][j]['video']) {
                        slicedData.push(data['recordings'][j])
                    }
                    j++
                }
    
                getCoverArt(slicedData)
                //* these results will be the ones the user chooses from
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [search]);

        
        
    const chooseAddition = (title, artist, length, cover) => {
        // update playlist with new song after selection from options
        setPlaylist((prevItems) => [...prevItems, {
            title: title, 
            artist: artist, 
            id: playlist.length !== 0 ? playlist[playlist.length - 1].id + 1 : 1, // if array not empty
            length: length,  
            coverArt: cover,
        }])
        //! HIDE POPUP  
        vis.hidePopup() 
        setIsChoosing(false)   
    }

    const exitChoosing = () => {
        vis.hidePopup()
        setIsChoosing(false)
    }

    function getCoverArt(slice) {
        const imagePromises = [];

        axios.defaults.baseURL = 'https://coverartarchive.org/release/'
        for (let i = 0; i < slice.length; i++) {
            imagePromises.push(
            axios.get(slice[i]['releases'][0]['id'])
            .then((res) => {
                const myJSON = JSON.stringify(res.data)
                const data = JSON.parse(myJSON)
                slice[i]['cover'] = data['images'][0]['image']
            }).catch((err) => {
                console.log(err)
            })
            )
        }
        Promise.all(imagePromises).then(() => {
            setAllImagesLoaded(true); // Set the flag when all images are loaded meaning the whole selection ui only loads after all images are gotten
            setSelection(slice);
        });
    }


    //* handle image loading
    const [loadedImageCount, setLoadedImageCount] = useState(0);
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoadedImageCount(prevCount => prevCount + 1);
    }

    useEffect(() => {
        if (loadedImageCount === (selection && selection.length)) {
            setAllImagesLoaded(true)
        }
    }, [loadedImageCount, selection]);

    return (   
        <div className="choose-song" style={{'visibility':vis.popupVis}}>
            <FontAwesomeIcon className='exit' icon={faX} style={{color: "#000000",}} onClick={exitChoosing}/>
            <div className="choose-song-wrapper">
                <h1 className='choose-song-heading'>Choose song to add</h1>
                {allImagesLoaded && selection && selection.map(song => (
                <div className='song popup' onClick={() => chooseAddition(song['title'], song['artist-credit'][0]['name'], (song['length'] !== undefined ? milliToMin(song['length']) : '-'), song['cover'])} key={song.id}>
                    <img className='cover-art' src={song['cover']} onLoad={handleImageLoad}></img>

                    <div className='song-info'>
                        <div className="song-title">
                            <p>{song['title']}</p>
                        </div>
                        <div className="song-artist">
                            <p>{song['artist-credit'][0]['name']}</p>
                        </div>
                    </div>
                    <div className='song-length'>
                        <p>{(song['length'] !== undefined ? milliToMin(song['length']) : '-')}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseSong;