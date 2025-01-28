import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration to save uploaded files in the uploads directory
const upload = multer({ 
  dest: path.join(__dirname, '../uploads/')
});

export default upload;
