import Navbar from "../../components/Navbar"
import Searchbar from './Searchbar'
import Playlist from "../../components/Playlist"
import ChooseSong from './ChooseSong'
import ApplyCustomiseSelect from "./ApplyCustomiseSelect"
import Customise from './Customise'

function Create({ playlist, setPlaylist, updatePlaylist, handleDelete, anyStylerOpen, setAnyStylerOpen, search, setSearch, fullBackground, setFullBackground, state, dispatch, selectedForStyling, setSelectedForStyling }) {
    return (
        <>
        <Navbar playlist={playlist}/>
        <main style={{minHeight: '90vh'}}>
            <Searchbar search={search} setSearch={setSearch}/>
            <Playlist fullBackground={fullBackground} playlist={playlist} updatePlaylist={updatePlaylist} handleDelete={handleDelete} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch}/>
            <ChooseSong playlist={playlist} setPlaylist={setPlaylist} search={search}/>
            <ApplyCustomiseSelect setFullBackground={setFullBackground} playlist={playlist} selectedForStyling={selectedForStyling} setSelectedForStyling={setSelectedForStyling} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen}/>
            <Customise playlist={playlist} state={state} dispatch={dispatch} anyStylerOpen={anyStylerOpen} setAnyStylerOpen={setAnyStylerOpen} setSelectedForStyling={setSelectedForStyling}/>
        </main>
        </>
        )
}

export default Create;