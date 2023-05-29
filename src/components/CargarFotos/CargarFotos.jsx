import { useState } from "react";

import './CargarFotos.css';

export const CargarFotos = () => {

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
            <div>
                {selectedFiles.map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                ))}
            </div>
        </>
    );
};