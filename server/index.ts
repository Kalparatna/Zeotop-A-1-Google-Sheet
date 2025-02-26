import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Use the correct CORS import
import connect from "./src/database/config.js";
import router from "./src/routes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://zeotop-a-1-google-sheet.vercel.app", "*"], // Replace with your actual frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

// Database connection and server start
connect().then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

// Export for Vercel deployment
export default app;
