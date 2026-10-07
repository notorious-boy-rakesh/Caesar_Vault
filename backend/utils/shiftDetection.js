const { decryptCaesar } = require('./caesarCipher');

const commonWords = new Set([
    'the', 'and', 'this', 'that', 'is', 'are', 'was', 'were', 'for', 'with',
    'from', 'you', 'your', 'have', 'has', 'not', 'but', 'can', 'will', 'hello',
    'world', 'file', 'text', 'data', 'system', 'student', 'project', 'computer'
]);

const commonBigrams = ['th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd'];
const commonTrigrams = ['ing', 'ion', 'tion', 'the', 'and', 'tha', 'ent'];
const unlikelyBigrams = ['qz', 'qx', 'jz', 'zx', 'qj', 'wq', 'vk', 'xj', 'zq', 'zz'];

const scoreText = (text) => {
    const lowerText = text.toLowerCase();
    const words = lowerText.match(/\b[a-z]+\b/g) || [];
    
    let score = 0;
    
    // Score words
    words.forEach(word => {
        if (commonWords.has(word)) {
            score += 10;
        } else if (word.length > 2) {
            // Small bonus for non-common valid-looking words to differentiate from gibberish
            score += 1; 
        }
    });
    
    // Score common letter combinations
    for (const bigram of commonBigrams) {
        let count = (lowerText.match(new RegExp(bigram, 'g')) || []).length;
        score += count * 2;
    }
    for (const trigram of commonTrigrams) {
        let count = (lowerText.match(new RegExp(trigram, 'g')) || []).length;
        score += count * 3;
    }
    
    // Penalize unlikely combinations
    for (const bigram of unlikelyBigrams) {
        let count = (lowerText.match(new RegExp(bigram, 'g')) || []).length;
        score -= count * 10;
    }
    
    return score;
};

const detectBestShift = (text) => {
    let bestScore = -Infinity;
    let bestShift = 0;
    let bestPlaintext = "";
    
    const scores = [];

    // Test all 26 shifts
    for (let shift = 0; shift < 26; shift++) {
        const plaintext = decryptCaesar(text, shift);
        const score = scoreText(plaintext);
        
        scores.push({ shift, plaintext, score });
        
        if (score > bestScore) {
            bestScore = score;
            bestShift = shift;
            bestPlaintext = plaintext;
        }
    }
    
    // Sort scores to determine confidence
    scores.sort((a, b) => b.score - a.score);
    
    const topScore = scores[0].score;
    const secondScore = scores[1].score;
    
    let confidence = "Low";
    
    if (topScore > 20 && (topScore - secondScore) > 10) {
        confidence = "High";
    } else if (topScore > 10 && (topScore - secondScore) > 4) {
        confidence = "Medium";
    }
    
    // If the top score is very low, there's not enough English information
    if (topScore <= 5) {
        confidence = "Low";
    }

    return {
        shift: bestShift,
        plaintext: bestPlaintext,
        confidence,
        score: topScore
    };
};

module.exports = { detectBestShift };
