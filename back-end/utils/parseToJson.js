import fs from 'fs';
import csv from 'csv-parser';



export async function parseToJson(filename) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filename)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        resolve(results); // Return results when the file is fully read
      })
      .on('error', (err) => {
        reject(err); // Handle errors
      });
  });
}




