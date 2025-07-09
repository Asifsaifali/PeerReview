// config/passport.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from 'dotenv'

dotenv.config()


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can find/create the user in DB
      const user = {
        githubId: profile.id,
        username: profile.username,
        avatar: profile.photos[0]?.value,
      };
      console.log(user);
      
      return done(null, user);
    }
  )
);

// Required for session-based login
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
