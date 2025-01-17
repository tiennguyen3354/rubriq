import express from 'express'; 


const app = express(); 


//configure your web server to parse JSON in a request body 
app.use(express.json()); 


app.get("/", (req, res) => {
    res.send("Server is running! testing ");
  });

// listenings 
app.listen(4242, () => console.log(`Server stared on port 4242`)); 

