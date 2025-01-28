import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { removePII } from '../utils/removePII.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint for file upload
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    const filePath = req.file.path;
    const outputPath = path.join(__dirname, `../uploads/cleaned-${req.file.originalname}`);

    try {
        // Log the file path to see where it's being saved
        console.log(`Original file saved to: ${filePath}`);
        console.log(`Cleaned file will be saved to: ${outputPath}`);

        // Remove PII and save the cleaned file
        await removePII(filePath, outputPath);

        // Log the cleaned file path
        console.log(`Cleaned file saved to: ${outputPath}`);

        //  success message and a public URL to download the cleaned file
        res.status(200).json({
            message: 'File uploaded and PII removed successfully!',
            cleanedFile: `/uploads/cleaned-${req.file.originalname}`, // Public URL
        });

        //  delete the original file
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file!' });
    }
});

export default router;
