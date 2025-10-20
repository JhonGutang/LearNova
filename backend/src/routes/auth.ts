import { Router } from "express";
import passport from "../passport/passport"; // adjust path if needed

const router = Router();

// =============================
// GOOGLE LOGIN FOR STUDENT
// =============================

const storeSession = (req: any) => {
  return new Promise<void>((resolve, reject) => {
    req.session.role = req.user.role;
    req.session.studentId = req.user.studentId;
    req.session.creatorId = req.user.creatorId;
    req.session.userId = req.user.userId;
    req.session.save((err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
};


router.get(
  "/google/student",
  (req: any, res, next) => {
    req.session.role = "STUDENT"; 
    req.session.save((err: any) => {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// =============================
// GOOGLE LOGIN FOR CREATOR
// =============================
router.get(
  "/google/creator",
  (req: any, res, next) => {
    req.session.role = "CREATOR";
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// =============================
// GOOGLE CALLBACK
// =============================
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    session: true,
  }),
  async (req: any, res) => {
    if (typeof req.isAuthenticated === "function" && req.isAuthenticated() && req.user) {
      try {
        await storeSession(req);  
        res.redirect("http://localhost:3001/home"); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Session save failed" });
      }
    } else {
      res.redirect("/auth/google/failure");
    }
  }
);

router.get("/check-data", (req: any, res) => {
  if (!req.session) {
    return res.status(500).json({ success: false, message: "No session available" });
  }
  res.json({ success: true, session: req.session });
});

router.get("/google/failure", (req, res) => {
  res.json({ success: false, message: "Google login failed" });
});

export default router;
