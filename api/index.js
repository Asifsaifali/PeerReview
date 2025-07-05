import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import connectDB from "./config/database.config.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
// console.log(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // ✅ no trailing slash!
  credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  console.log("Received code:", code);
  
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }
  try {
    const redirectUri = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = redirectUri.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ error: "Access token not received" });
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    console.log("userResponse", userResponse.data);
    
    return res.status(200).json({
      user: userResponse.data,
      accessToken: accessToken,
      message: "Successfully authenticated with GitHub",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while authenticating with GitHub",
      details: error.message,
    });
  }
});

connectDB()
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
