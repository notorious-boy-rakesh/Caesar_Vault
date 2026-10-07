import React from 'react';

const ShiftInput = ({ shift, setShift, disabled }) => {
    return (
        <div className="shift-input-container">
            <label htmlFor="shift-input">Shift Value</label>
            <input
                id="shift-input"
                type="number"
                min="0"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                disabled={disabled}
                placeholder="e.g. 3"
            />
        </div>
    );
};

export default ShiftInput;
