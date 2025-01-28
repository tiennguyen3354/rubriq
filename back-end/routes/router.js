import express from 'express'; 
import { getChatResponse } from '../controllers/llmController.js';
//LLM route
const llm = express.Router(); 
llm.post("/", getChatResponse); 

export { llm }; 