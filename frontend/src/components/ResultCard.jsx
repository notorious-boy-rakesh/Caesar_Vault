import React from 'react';
import { CheckCircle, AlertTriangle, Download, RotateCcw } from 'lucide-react';

const ResultCard = ({ result, operation, onReset }) => {
    if (!result) return null;

    const handleDownload = () => {
        const blob = new Blob([result.content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = result.outputFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="result-card">
            <div className="result-header">
                <CheckCircle className="success-icon" size={24} />
                <h3>{operation === 'encrypt' ? 'Encryption Complete' : 'Decryption Complete'}</h3>
            </div>

            <div className="result-details">
                {operation === 'encrypt' ? (
                    <>
                        <div className="detail-row">
                            <span className="label">Original File:</span>
                            <span className="value">{result.originalName}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Shift Used:</span>
                            <span className="value">{result.shiftUsed}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="detail-row">
                            <span className="label">Input File:</span>
                            <span className="value">{result.originalName}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Detected Shift:</span>
                            <span className="value">{result.detectedShift}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Confidence:</span>
                            <span className={`value confidence-${result.confidence.toLowerCase()}`}>
                                {result.confidence === 'Low' && <AlertTriangle className="warning-icon" size={16} />}
                                {result.confidence}
                            </span>
                        </div>
                        {result.confidence === 'Low' && (
                            <div className="warning-message">
                                ⚠ The uploaded text does not contain enough English-language information to reliably identify the original shift.
                            </div>
                        )}
                    </>
                )}
                
                <div className="detail-row">
                    <span className="label">Output File:</span>
                    <span className="value">{result.outputFilename}</span>
                </div>
            </div>

            <div className="result-actions">
                <button className="download-btn" onClick={handleDownload}>
                    <Download size={18} />
                    Download {operation === 'encrypt' ? 'Encrypted' : 'Decrypted'} File
                </button>
                <button className="reset-btn" onClick={onReset}>
                    <RotateCcw size={18} />
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
