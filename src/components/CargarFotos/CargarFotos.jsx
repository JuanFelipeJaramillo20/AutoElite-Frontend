import { useState, useRef, useEffect } from "react";

import './CargarFotos.css';

export const CargarFotos = () => {

    const showUploadedImagesContainer = useRef();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files.length > 0 && selectedFiles.length + files.length <= 5) {
            setSelectedFiles([...selectedFiles, ...files]);
        }
    };

    const handleDeleteImage = (id) => {
        const newPictures = [...selectedFiles];
        newPictures.splice(id,1);
        setSelectedFiles(newPictures);
    }

    useEffect(() => {
        if (showUploadedImagesContainer.current) {
            if (selectedFiles.length < 0) {
                showUploadedImagesContainer.current.style.display = 'none';
            } else {
                showUploadedImagesContainer.current.style.display = 'flex';
            }
        }
    }, [selectedFiles.length]);

    return (
        <>
            <label
                className={`file-upload-label ${dragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <i className="fa-sharp fa-solid fa-photo-film"></i>
                <input
                    type="file"
                    id="image"
                    name="image"
                    multiple
                    accept="image/*"
                    onChange={(event) => {
                        const files = event.target.files;
                        if (files.length > 0) {
                            setSelectedFiles([...selectedFiles, ...files]);
                        }
                    }}
                />
            </label>
            <div ref={showUploadedImagesContainer} className="show-images__car">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="image-card">
                        <button onClick={() => {handleDeleteImage(index)}}>
                            <span><i className="fa-solid fa-xmark"></i></span>
                        </button>
                        <img className="card-image__uploaded" src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
        </>
    );
};