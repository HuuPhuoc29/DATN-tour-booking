import express  from "express";

import { deleteUsers, getAllUserss, getUsers, updateUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CHECK - VERIFY
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

// UPDATE
router.put("/:id", verifyUser, updateUsers)

// DELETE
router.delete("/:id", verifyUser, deleteUsers)

// GET
router.get("/:id", verifyUser, getUsers)

// GET ALL
router.get("/", verifyAdmin, getAllUserss)

export default router