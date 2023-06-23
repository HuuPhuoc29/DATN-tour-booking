import express  from "express";
import { login, logout, register, verifyEmail } from "../controllers/auth.js";

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Hello, this is auth endpoint ");
// })

router.post("/register", register)
router.get("/verify-email/:token", verifyEmail)
router.post("/login", login)
router.delete("/logout", logout)

export default router