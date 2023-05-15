import express  from "express";
import { deleteUsers, getAllUserss, getUsers, updateUsers } from "../controllers/user.js";

const router = express.Router();

// CREATE

// UPDATE
router.put("/:id", updateUsers)

// DELETE
router.delete("/:id", deleteUsers)

// GET
router.get("/:id", getUsers)

// GET ALL
router.get("/", getAllUserss)

export default router