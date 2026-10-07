# CAESAR VAULT

## Project Description
CAESAR VAULT is a stateless, production-quality academic web application for file-based Caesar Cipher encryption and automatic decryption. Built using the MERN-style JavaScript ecosystem (without MongoDB), the application allows users to encrypt TXT files using a user-provided Caesar shift and automatically decrypt them without knowing the original shift value.

## Problem Statement
Traditional encryption systems often require the user to explicitly know the cryptographic key for decryption. This project explores automatic key discovery in classical cryptography (Caesar Cipher) by analyzing English language patterns and frequency without requiring user input or a database.

## Objectives
1. Implement a complete, stateless Caesar Cipher encryption/decryption system.
2. Build an intelligent automatic shift detection algorithm using English language scoring.
3. Design a responsive, modern UI with shared components for both encryption and decryption workflows.
4. Maintain exactly the same file upload component logic.
5. Preserve text formatting (numbers, symbols, spaces, paragraphs).

## Features
- **Stateless Architecture**: No databases, no user accounts, no permanent file storage.
- **Shared Upload Interface**: Identical drag-and-drop or file picker experience for both operations.
- **Caesar Encryption**: Wraps around alphabetic characters seamlessly and ignores non-alphabetic elements.
- **Automatic Shift Detection**: Tests 26 shifts, scores them based on English bigrams/trigrams/words, and identifies the best match.
- **Detailed Results**: Displays confidence levels and dynamically generates downloadable output files.
- **Modern UI**: Dark mode aesthetic, glassmorphism, responsive components, and visual loading states.

## Encryption Workflow
1. User uploads a `.txt` file.
2. User enters a non-negative shift value.
3. The server normalizes the shift (mod 26).
4. Alphabetic characters are shifted; all other characters and spacing are preserved.
5. The user downloads the generated `_encrypted.txt` file.

## Decryption Workflow
1. User uploads the encrypted `.txt` file.
2. **No shift value is provided.**
3. The server decrypts the file across all 26 possible shifts.
4. Each candidate is scored for valid English features.
5. The highest-scoring shift is selected and displayed with a confidence metric.
6. The user downloads the generated `_decrypted.txt` file.

## Automatic Shift Detection
The application uses a lightweight scoring algorithm inside `shiftDetection.js`:
- It checks for common words (e.g., *the, and, this, file*).
- It scores common bigrams and trigrams (e.g., *th, he, ing, tion*).
- It penalizes unlikely combinations (e.g., *qz, jz, qj*).
- The shift with the highest score is chosen, and a confidence level (High, Medium, Low) is calculated based on the margin of victory.

## Caesar Cipher Mathematics
- **Encryption**: `C = (P + K) mod 26`
- **Decryption**: `P = (C - K) mod 26`
- If encryption used shift `K = 3`, the automatic detection correctly identifies `3` and applies `-3` to recover the plaintext.

## Technology Stack
- **Frontend**: React.js, Vite, Vanilla CSS, Lucide React (Icons)
- **Backend**: Node.js, Express.js, Multer (Memory Storage)
- **Database**: NONE (Completely Stateless)

## Project Structure
```
Caesar-Vault/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── OperationSelector.jsx
│   │   │   ├── ShiftInput.jsx
│   │   │   ├── ActionButton.jsx
│   │   │   └── ResultCard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── routes/
│   │   └── encryptionRoutes.js
│   ├── controllers/
│   │   └── encryptionController.js
│   ├── utils/
│   │   ├── caesarCipher.js
│   │   └── shiftDetection.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

## Running Frontend
```bash
cd client
npm install
npm run dev
```

## Running Backend
```bash
cd server
npm install
node server.js
```

## API Endpoints
- `POST /api/encrypt` - Accepts `multipart/form-data` with `file` and `shift`. Returns encrypted text.
- `POST /api/decrypt` - Accepts `multipart/form-data` with `file`. Automatically detects shift and returns decrypted text.

## Testing
- Encrypt "Hello World" with shift 3 → "Khoor Zruog".
- Decrypt "Khoor Zruog" → Detects shift 3 and returns "Hello World".
- Format preservation: "Hello 2026!" with shift 3 → "Khoor 2026!".
- Out-of-bounds shifts: 29 effectively behaves as 3 (29 mod 26).

## Limitations
Automatic shift detection works best on English language sentences. If the provided text is extremely short, contains only numbers, or is purely random symbols (e.g., "12345!@#"), the scoring algorithm may yield a "Low" confidence or misidentify the shift since there is no meaningful English context to analyze.

## Privacy/Stateless Architecture
This application does not permanently store any uploaded or generated files. Files are temporarily processed in memory on the server and immediately returned to the client as download blobs. No database, tracking, or cloud storage is implemented.
