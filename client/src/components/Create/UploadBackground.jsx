export function UploadBackground(props) {
    return (
        <div className="upload-background">
            <button
                className="btn upload-background-btn"
                onClick={() => props.handleFileUpload("uploadBackground")}
            >
                Upload Background
            </button>
            <input
                ref={props.fileUploadRef}
                onChange={props.handleFileChange}
                type="file"
                accept="image/png, image/jpeg"
                className="file-upload"
            ></input>
        </div>
    );
}
