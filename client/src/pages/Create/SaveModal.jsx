import {useEffect, useState, useRef} from 'react'

function SaveModal({ isSaveModalOpen, setIsSaveModalOpen, playlist }) {

    const modalRef = useRef(null)

    useEffect(() => {
        if (isSaveModalOpen) {
            modalRef.current.showModal()
        }
    }, [isSaveModalOpen])

    const cancelModal = () => {
        modalRef.current.close()
        setIsSaveModalOpen(false)
    }

    const save = () => {
        modalRef.current.close()
        setIsSaveModalOpen(false)

        //! SAVING TO DATABSE LOGIC
    }

    return (
        <dialog className='save-modal' ref={modalRef}>
            <div className='save-modal-wrapper'>
                <h1>Save Playlist</h1>
                <input type='text' placeholder='Enter title of playlist'></input>
                <input type='text' placeholder='Enter your username'></input>
                <div className='modal-btn-wrapper'>
                    <button className='modal-cancel-btn' onClick={() => cancelModal()}>Cancel</button>
                    <button className='modal-save-btn' onClick={() => save()}>Save</button>
                </div>
            </div>
        </dialog>
    )
}

export default SaveModal;