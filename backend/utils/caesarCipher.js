const encryptCaesar = (text, shift) => {
    const k = shift % 26;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                result += String.fromCharCode(((code - 65 + k) % 26 + 26) % 26 + 65);
            }
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                result += String.fromCharCode(((code - 97 + k) % 26 + 26) % 26 + 97);
            }
        } else {
            result += char;
        }
    }
    return result;
};

const decryptCaesar = (text, shift) => {
    return encryptCaesar(text, -shift);
};

module.exports = { encryptCaesar, decryptCaesar };
