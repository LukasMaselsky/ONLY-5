export function UploadBackground(props) {
    return (
        <div className="upload-background">
            <button
                className="upload-background-btn"
                onClick={() => props.handleFileUpload("uploadBackground")}
            >
                Upload Background
            </button>
            <input
                ref={props.fileUploadRef}
                onChange={props.handleFileChange}
                type="file"
                accept="image/*"
                className="file-upload"
            ></input>
        </div>
    );
}
