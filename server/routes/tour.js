import express  from "express";

import Tour from "../models/Tour.js"
import { createError } from "../utils/error.js";
import { countByCity, createTour, deleteTour, getAllTours, getTour, updateTour, } from "../controllers/tour.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createTour)

// UPDATE
router.put("/:id", verifyAdmin, updateTour)

// DELETE
router.delete("/:id", verifyAdmin, deleteTour)

// GET
router.get("/find/:id", getTour)

// GET ALL
router.get("/", getAllTours)

// COUNT
router.get("/countByCity", countByCity)
// router.get("/countByType", countByType)

export default router