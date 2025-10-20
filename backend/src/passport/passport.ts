import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../config/prisma";
import { PassportService } from "./passport.service";

// Instantiate the PassportService with prisma
const passportService = new PassportService(prisma);

// Google OAuth configuration values
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID!,
      clientSecret: googleClientSecret!,
      callbackURL: googleCallbackURL!,
      passReqToCallback: true,
    },
    async (req: any, accessToken, refreshToken, profile, done) => {
      try {
        const ROLE = req.session.role;
        const EMAIL_FROM_PROVIDER = profile.emails?.[0]?.value;
        let studentId: number | undefined;
        let creatorId: number | undefined;

        if (!ROLE || !EMAIL_FROM_PROVIDER) {
          const errorMsg = !ROLE
            ? "No role specified in login."
            : "No email found from Google.";
          console.error("Google Auth Error:", errorMsg);
          return done(null, false, { message: errorMsg });
        }

        let user = await passportService.doesUserExist(profile);

        if (!user) {
          if (ROLE === "STUDENT") {
            user = await passportService.createStudentUser(EMAIL_FROM_PROVIDER, profile);
          } else if (ROLE === "CREATOR") {
            user = await passportService.createCreatorUser(EMAIL_FROM_PROVIDER, profile);
          } else {
            const errorMsg = "Invalid role specified.";
            console.error("Google Auth Error:", errorMsg);
            return done(null, false, { message: errorMsg });
          }
        }

        if (user.role === "STUDENT" && user.student && user.student.id) {
          studentId = user.student.id;
        }
        if (user.role === "CREATOR" && user.creator && user.creator.id) {
          creatorId = user.creator.id;
        }

        return done(null, {
          userId: user.id,
          role: user.role,
          studentId,
          creatorId,
        });

      } catch (err) {
        console.error("Google Auth Error:", err);
        return done(err, undefined);
      }
    }
  )
);

// ======================
// SESSION HANDLING
// ======================
passport.serializeUser((user: any, done) => {
  done(null, user); 
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj); 
});

export default passport;
