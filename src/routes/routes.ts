import { getUserRepoInfo } from "../api/github";
import express from 'express';

// exports an express Router instance

const app = express.Router();

app.get("/", getUserRepoInfo);

export default app;
