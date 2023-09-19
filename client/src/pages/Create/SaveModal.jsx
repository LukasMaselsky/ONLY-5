import {useEffect, useState, useRef, useCallback} from 'react'
import axios from 'axios'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


function SaveModal({ isSaveModalOpen, setIsSaveModalOpen, playlist }) {

    const element = document.getElementsByClassName('playlist')[0]

    const [post, setPost] = useState({
        title: '',
        author: '',
        date: new Date().toISOString().slice(0, 10),
        image: '',
    })

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

    const download = async () => {
        if (element === null) {
          return
        }
    
        toBlob(element, { cacheBust: true, })
          .then((blob) => {
            const newImage = new File([blob], 'image', {type:'image/png'})

            setPost(prev => ({...prev, image:newImage}))
          })
          .catch((err) => {
            console.log(err)
        })

        try {
            const formData = new FormData()
            formData.append('image', post.image)
            formData.append('title', post.title)
            formData.append('author', post.author)
            formData.append('date', post.date)
            
            modalRef.current.close()
            setIsSaveModalOpen(false)
            await axios.post("http://localhost:8800/posts", formData)
        }
        catch (err) {
            console.log(err)
        }
    }

    
    const save = async (e) => {
        e.preventDefault()
        
        modalRef.current.close()
        setIsSaveModalOpen(false)

        try {
            await axios.post("http://localhost:8800/posts", post)
        }
        catch (err) {
            console.log(err)
        }
    }


    // detect esc pressed to exit
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode == 27) {  
                modalRef.current.close()
                setIsSaveModalOpen(false)
            }
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Don't forget to clean up
        return function cleanup() {
          document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const handleChange = (e) => {
        setPost(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    return (
        <dialog className='save-modal' ref={modalRef}>
            <div className='save-modal-wrapper'>
                <h1>Save Playlist</h1>
                <input type='text' placeholder='Enter title of playlist' name='title' onChange={handleChange}></input>
                <input type='text' placeholder='Enter your username' name='author' onChange={handleChange}></input>
                <div className='modal-btn-wrapper'>
                    <button className='modal-cancel-btn' onClick={cancelModal}>Cancel</button>
                    <button className='modal-save-btn' onClick={download}>Save</button>
                </div>
            </div>
        </dialog>
    )
}

export default SaveModal;