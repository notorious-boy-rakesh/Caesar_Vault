import React from 'react';
import { Loader2 } from 'lucide-react';

const ActionButton = ({ operation, onClick, disabled, loading }) => {
    return (
        <button
            className="action-button"
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <>
                    <Loader2 className="spinner" size={20} />
                    {operation === 'encrypt' ? 'Encrypting file...' : 'Analyzing 26 possible shifts...'}
                </>
            ) : (
                operation === 'encrypt' ? 'Encrypt File' : 'Detect Shift & Decrypt'
            )}
        </button>
    );
};

export default ActionButton;
