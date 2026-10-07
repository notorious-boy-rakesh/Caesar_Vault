import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import OperationSelector from './components/OperationSelector';
import ShiftInput from './components/ShiftInput';
import ActionButton from './components/ActionButton';
import ResultCard from './components/ResultCard';

function App() {
    const [operation, setOperation] = useState('encrypt');
    const [file, setFile] = useState(null);
    const [shift, setShift] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleOperationChange = (newOp) => {
        setOperation(newOp);
        setError('');
        setResult(null);
    };

    const handleAction = async () => {
        if (!file) {
            setError('Please select a TXT file.');
            return;
        }

        if (operation === 'encrypt' && (shift === '' || parseInt(shift, 10) < 0)) {
            setError('Please enter a valid shift value.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        if (operation === 'encrypt') {
            formData.append('shift', shift);
        }

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const url = operation === 'encrypt' ? `${baseUrl}/api/encrypt` : `${baseUrl}/api/decrypt`;
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Unable to process the file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setShift('');
        setResult(null);
        setError('');
        setLoading(false);
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>CAESAR VAULT</h1>
                <p>TXT File Encryption & Automatic Decryption</p>
            </header>

            <main className="main-content">
                <OperationSelector operation={operation} setOperation={handleOperationChange} />

                <div className="card">
                    <FileUpload file={file} setFile={setFile} disabled={loading || result !== null} />
                    
                    {error && <div className="error-alert">{error}</div>}

                    {operation === 'encrypt' && !result && (
                        <ShiftInput shift={shift} setShift={setShift} disabled={loading} />
                    )}

                    {!result && (
                        <ActionButton 
                            operation={operation} 
                            onClick={handleAction} 
                            disabled={!file || (operation === 'encrypt' && shift === '')} 
                            loading={loading} 
                        />
                    )}

                    <ResultCard result={result} operation={operation} onReset={handleReset} />
                </div>
            </main>
        </div>
    );
}

export default App;
