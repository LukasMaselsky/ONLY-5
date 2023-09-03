import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Visibility } from "./App";

function Playlist({ playlist, updatePlaylist, handleDelete, selectedForStyling, setSelectedForStyling, state, dispatch}) {
    
    const vis = useContext(Visibility)

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(playlist)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        updatePlaylist(items)
    }

    //* works now
    const handleCheckboxChange = (event, id) => {
        if (selectedForStyling.includes(id)) {
            const newSelected = selectedForStyling.filter(e => e !== id)
            setSelectedForStyling(newSelected)
        }
        else {
            setSelectedForStyling((prev) => [...prev, id])
        }
    }

    // change BG colour on each song selected
    useEffect(() => {
        for (let i = 0;i < selectedForStyling.length;i++) {
            const colourRGBA = JSON.stringify(Object.values(state.BGColour))
            const id = 'song-' + String(selectedForStyling[i])
            const element = document.getElementById(id)
            element.style.backgroundColor = 'rgba(' + colourRGBA.slice(1, -1) + ')'
        }
    }, [state.BGColour])

    // change font type on each song selected
    useEffect(() => {
        for (let i = 0;i < selectedForStyling.length;i++) {
            console.log(state.fontType)
            const id = 'song-' + String(selectedForStyling[i])
            const element = document.getElementById(id)
            element.style.fontFamily = '"' + state.fontType + '"'
        }
    }, [state.fontType])


    // change font type on each song selected
    useEffect(() => {
        for (let i = 0;i < selectedForStyling.length;i++) {
            const colourRGBA = JSON.stringify(Object.values(state.fontColour))
            const id = 'song-' + String(selectedForStyling[i])
            const element = document.getElementById(id)
            element.style.color = 'rgba(' + colourRGBA.slice(1, -1) + ')'
        }
    }, [state.fontColour])

    return (
        <div className='playlist'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='songs'>
                {(provided) => (

                    <div className="playlist-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                        {playlist.map((song, index) => (
                            <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                                {(provided) => (
                                    <div className='song' id={'song-' + String(song.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <img className='cover-art' src={song.coverArt}></img>
                                        <div className='song-info'>
                                            <div className="song-title">
                                                <p>{song.title}</p>
                                            </div>
                                            <div className="song-artist">
                                                <p>{song.artist}</p>
                                            </div>
                                            
                                        </div>
                                        <div className='song-length'>
                                            <p>{song.length}</p>
                                        </div>
                                        <div className="trash-wrapper">
                                            <FontAwesomeIcon className='trash' icon={faTrash} style={{color: "#ffffff",}} onClick={() => handleDelete(song.id)}/>
                                        </div>
                                        <div className="checkbox" style={{'visibility':vis.checkboxVis}}>
                                            <input type='checkbox' onClick={(e) => handleCheckboxChange(e, song.id)}></input>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                    )}
            </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Playlist;