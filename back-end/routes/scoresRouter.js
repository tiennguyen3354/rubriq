import express from 'express';
import { getScores } from './../controllers/scoresController.js';

const scoresRouter = express.Router();

scoresRouter.get('/scores', getScores);

export default scoresRouter;