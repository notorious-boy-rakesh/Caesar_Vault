import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

const FileUpload = ({ file, setFile, disabled }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

    const validateFile = (selectedFile) => {
        setError('');
        if (!selectedFile) return false;

        if (selectedFile.type !== 'text/plain' && !selectedFile.name.toLowerCase().endsWith('.txt')) {
            setError('Only TXT files are supported.');
            return false;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size must not exceed 10 MB.');
            return false;
        }

        return true;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
        }
        e.target.value = null;
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
            }
            e.dataTransfer.clearData();
        }
    }, [disabled, setFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleRemove = () => {
        setFile(null);
        setError('');
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="file-upload-container">
            <h3>Upload TXT File</h3>
            
            {error && <div className="error-message">{error}</div>}

            {!file ? (
                <div
                    className={`drop-zone ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <UploadCloud size={48} className="upload-icon" />
                    <p className="drop-text">Drag & Drop TXT File Here</p>
                    <p className="or-text">OR</p>
                    <label className="file-input-label">
                        Choose From Device
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileChange}
                            disabled={disabled}
                            className="hidden-file-input"
                        />
                    </label>
                </div>
            ) : (
                <div className="selected-file-card">
                    <div className="file-info">
                        <FileText className="file-icon" />
                        <div>
                            <p className="file-name">{file.name}</p>
                            <p className="file-size">{formatSize(file.size)}</p>
                        </div>
                    </div>
                    {!disabled && (
                        <button className="remove-btn" onClick={handleRemove} aria-label="Remove file">
                            <X size={20} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
