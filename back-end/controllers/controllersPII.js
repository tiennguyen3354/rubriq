import fs from 'fs';
import path from 'path';
import { removePII } from '../utils/removePII.js';  

// Handle file upload and PII removal
export async function handleFileUpload(req, res) {
    console.log('File upload request received');

    if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    const filePath = req.file.path;  // Path of the uploaded file
    const outputPath = path.join(__dirname, `../uploads/cleaned-${req.file.originalname}`);  // Path for the cleaned file

    console.log('File path:', filePath);

    try {
        console.log("Processing file...");
        await removePII(filePath, outputPath);  // Process the file to remove PII

        console.log("File processed and saved to:", outputPath);

        res.status(200).json({
            message: 'File uploaded and PII removed successfully!',
            cleanedFile: `/uploads/cleaned-${req.file.originalname}`,  // URL for the cleaned file
        });

        fs.unlinkSync(filePath);  
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file!' });
    }
}

// Serve the cleaned file to the user
export function serveFile(req, res) {
    const { filename } = req.params;
    res.download(path.join(__dirname, '../uploads', filename), filename, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error sending file.');
        }
    });
}
