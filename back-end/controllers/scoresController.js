import access from './../utils/accessScores.js';

/**
 * Gets scores and dsiplays them.
 * 
 * @param {*} req the request object
 * @param {*} res the response object
 */
export const getScores = async (req, res) => {
    let scores = await access.getScores();

    if(scores) {
        res.status(200);
        let html = `
            <h1>View Scores</h1>
            <ul>
        `;
        scores.forEach(score => {
            html += `
            <li>
                <div>
                    <h3>${score.name} - ${score.grade}</h3>
                    <p>${score.notes}</p>
                </div>
            </li>`;
        });

        html += '</ul>';

        res.send(html);
    } else {
        res.status(500).send('Server error: Something went wrong.');
    }
}
