import axios from "axios";
import UserRepository from "../repository/user.repository.js";
import dotenv from "dotenv";
dotenv.config();
const userRepository = new UserRepository()

const createUser = async(req,res)=>{
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
    console.log("Access Token:", accessToken);
    
    if (!accessToken) {
      return res.status(400).json({ error: "Access token not received" });
    }
    console.log("Access Token:", accessToken);
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    console.log("User Response:", userResponse.data);
    const userData = {
        githubId: userResponse.data.id,
        username: userResponse.data.login,
        avatarUrl: userResponse.data.avatar_url,
    }
    await userRepository.createUser(userData)
    console.log("Sucessfully created user:", userData);
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
}

export { createUser };