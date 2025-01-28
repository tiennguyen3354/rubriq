import fs from 'fs';
import csvParser from 'csv-parser';
import { parse } from 'json2csv';
import { v4 as uuidv4 } from 'uuid';

// Function to remove PII from a CSV file
export async function removePII(inputPath, outputPath) {
    const rows = [];
    let studentCounter = 1;
    let accountCounter = 1;

    return new Promise((resolve, reject) => {
        fs.createReadStream(inputPath)
            .pipe(csvParser())
            .on('data', (row) => {
                if (!row['name'] && !row['id']) return; // Skip rows without essential info

                // Anonymize the student name and root_account
                if (row['name']) row['name'] = `Student_${studentCounter++}`;
                if (row['root_account']) {
                    row['root_account'] = `StudentAccount_${accountCounter++}`;
                } else {
                    console.log("root_account field not found in this row", row);
                }

                rows.push(row);
            })
            .on('end', () => {
                console.log('Processed rows:', rows.length);
                const csv = parse(rows);
                fs.writeFileSync(outputPath, csv);
                console.log('Cleaned file saved to:', outputPath);
                resolve();
            })
            .on('error', reject);
    });
}
