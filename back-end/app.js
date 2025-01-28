import express from 'express'; 

import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/uploadRoutes.js';
const app = express(); 


//configure your web server to parse JSON in a request body 
app.use(express.json()); 


// Get __dirname  for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../front-end')));

// Serve static files from the `uploads` folder (to make the files publicly accessible)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve `view.html` for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'view.html'));
});

// Use the upload routes for handling file uploads
app.use(uploadRoutes);


// listenings 
app.listen(4242, () => console.log(` http://localhost:4242`)); 


