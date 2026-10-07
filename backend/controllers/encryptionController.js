const { encryptCaesar } = require('../utils/caesarCipher');
const { detectBestShift } = require('../utils/shiftDetection');
const path = require('path');

const encryptFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a TXT file.' });
        }
        
        const shift = parseInt(req.body.shift, 10);
        if (isNaN(shift) || shift < 0) {
            return res.status(400).json({ error: 'Please enter a valid shift value.' });
        }

        const fileContent = req.file.buffer.toString('utf8');
        const encryptedContent = encryptCaesar(fileContent, shift);
        
        // Output Filename
        const originalName = req.file.originalname;
        const baseName = path.basename(originalName, path.extname(originalName));
        let outputFilename = `${baseName}_encrypted.txt`;

        res.json({
            success: true,
            originalName,
            shiftUsed: shift % 26,
            outputFilename,
            content: encryptedContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to process the file.\nPlease try again.' });
    }
};

const decryptFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a TXT file.' });
        }

        const fileContent = req.file.buffer.toString('utf8');
        const { shift, plaintext, confidence, score } = detectBestShift(fileContent);

        const originalName = req.file.originalname;
        const baseName = path.basename(originalName, path.extname(originalName));
        let outputFilename = `${baseName}_decrypted.txt`;
        
        res.json({
            success: true,
            originalName,
            detectedShift: shift,
            confidence,
            outputFilename,
            content: plaintext
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to process the file.\nPlease try again.' });
    }
};

module.exports = {
    encryptFile,
    decryptFile
};
