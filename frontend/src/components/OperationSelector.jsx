import React from 'react';

const OperationSelector = ({ operation, setOperation }) => {
    return (
        <div className="operation-selector">
            <h3>Operation</h3>
            <div className="radio-group">
                <label className={`radio-label ${operation === 'encrypt' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        value="encrypt"
                        checked={operation === 'encrypt'}
                        onChange={() => setOperation('encrypt')}
                    />
                    <span className="custom-radio"></span>
                    Encrypt
                </label>
                <label className={`radio-label ${operation === 'decrypt' ? 'active' : ''}`}>
                    <input
                        type="radio"
                        value="decrypt"
                        checked={operation === 'decrypt'}
                        onChange={() => setOperation('decrypt')}
                    />
                    <span className="custom-radio"></span>
                    Decrypt
                </label>
            </div>
        </div>
    );
};

export default OperationSelector;
