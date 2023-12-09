import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Searchbar from "../../components/Create/Searchbar";
import Playlist from "../../components/Create/Playlist";
import ChooseSong from "../../components/Create/ChooseSong";
import ApplyCustomiseSelect from "../../components/Create/ApplyCustomiseSelect";
import Customise from "../../components/Create/Customise";
import SaveModal from "../../components/Create/SaveModal";

function Create({
    playlist,
    setPlaylist,
    updatePlaylist,
    handleDelete,
    anyStylerOpen,
    setAnyStylerOpen,
    search,
    setSearch,
    fullBackground,
    setFullBackground,
    state,
    dispatch,
    selectedForStyling,
    setSelectedForStyling,
    isSaveModalOpen,
    setIsSaveModalOpen,
    playlistRef,
}) {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: "90vh" }}>
                <Searchbar setSearch={setSearch} playlist={playlist} />
                <Playlist
                    playlistRef={playlistRef}
                    fullBackground={fullBackground}
                    playlist={playlist}
                    updatePlaylist={updatePlaylist}
                    handleDelete={handleDelete}
                    selectedForStyling={selectedForStyling}
                    setSelectedForStyling={setSelectedForStyling}
                    state={state}
                    dispatch={dispatch}
                />
                <ChooseSong
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    search={search}
                    setSearch={setSearch}
                />
                <ApplyCustomiseSelect
                    setFullBackground={setFullBackground}
                    playlist={playlist}
                    selectedForStyling={selectedForStyling}
                    setSelectedForStyling={setSelectedForStyling}
                    state={state}
                    dispatch={dispatch}
                    anyStylerOpen={anyStylerOpen}
                    setAnyStylerOpen={setAnyStylerOpen}
                />
                <Customise
                    playlist={playlist}
                    state={state}
                    dispatch={dispatch}
                    anyStylerOpen={anyStylerOpen}
                    setAnyStylerOpen={setAnyStylerOpen}
                    setSelectedForStyling={setSelectedForStyling}
                    setIsSaveModalOpen={setIsSaveModalOpen}
                />
                <SaveModal
                    playlistRef={playlistRef}
                    isSaveModalOpen={isSaveModalOpen}
                    setIsSaveModalOpen={setIsSaveModalOpen}
                    playlist={playlist}
                />
            </main>
            <Footer />
        </>
    );
}

export default Create;
