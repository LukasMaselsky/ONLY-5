import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Visibility } from "./App";

function Playlist({ playlist, updatePlaylist, handleDelete, selectedForStyling, setSelectedForStyling}) {
    
    const vis = useContext(Visibility)

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(playlist)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        updatePlaylist(items)
    }

    //! THIS DOESNT WORK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleCheckboxChange = (event, id) => {
        if (selectedForStyling.includes(id)) {
            const newSelected = selectedForStyling.filter(e => e !== id)
            setSelectedForStyling(newSelected)
        }
        else {
            console.log('here')
            setSelectedForStyling((prev) => [...prev, id])
        }
        console.log(selectedForStyling)
    }

    return (
        <div className='playlist'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='songs'>
                {(provided) => (

                    <div className="playlist-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                        {playlist.map((song, index) => (
                            <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                                {(provided) => (
                                    <div className='song' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
                    </div>
                    )}
            </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Playlist;