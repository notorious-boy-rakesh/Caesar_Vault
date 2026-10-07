const express = require('express');
const router = express.Router();
const multer = require('multer');
const { encryptFile, decryptFile } = require('../controllers/encryptionController');

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/plain' || file.originalname.toLowerCase().endsWith('.txt')) {
            cb(null, true);
        } else {
            cb(new Error('Only TXT files are supported.'));
        }
    }
});

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size must not exceed 10 MB.' });
        }
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};

router.post('/encrypt', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) return handleUploadError(err, req, res, next);
        next();
    });
}, encryptFile);

router.post('/decrypt', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) return handleUploadError(err, req, res, next);
        next();
    });
}, decryptFile);

module.exports = router;
