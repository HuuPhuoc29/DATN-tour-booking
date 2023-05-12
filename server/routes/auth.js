import express  from "express";
import { register } from "../controllers/auth.js";

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Hello, this is auth endpoint ");
// })

router.post("/register", register)

export default router