import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/database/config.js";
import router from "./src/routes";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  "https://zeotop-a-1-google-sheet.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
