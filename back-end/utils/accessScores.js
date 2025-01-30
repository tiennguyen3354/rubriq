import fs from 'fs/promises';

const scoresPath = './uploads/scores.json';

/**
 *  Processes and returns the scores.
 */
const getScores = async () => {
    let contents = await fs.readFile(scoresPath);
    
    // Check if we received JSON data
    try {
        return contents = JSON.parse(contents);
    } catch (error) {
        return undefined;
    }
}

export default {
    getScores
}