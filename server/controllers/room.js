import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

//CREATE
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : { rooms: savedRoom._id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)

    } catch(err) {
        next(err)
    }
}

//UPDATE
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(200).json(updatedRoom)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

//DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull : { rooms: req.params.id },
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json("Delete successfully")
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET
export const getRoom = async (req, res, next) => {
    try {
        const gotRoom = await Room.findById(req.params.id)
        res.status(200).json(gotRoom)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET ALL
export const getAllRooms = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, "You are not authenticated!"))

    try {
        const gotAllRooms = await Room.find()
        res.status(200).json(gotAllRooms)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}