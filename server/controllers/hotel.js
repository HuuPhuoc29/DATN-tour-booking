import Hotel from "../models/Hotel.js";

//CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//UPDATE
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Delete successfully")
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET
export const getHotel = async (req, res, next) => {
    try {
        const gotHotel = await Hotel.findById(req.params.id)
        res.status(200).json(gotHotel)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET ALL
export const getAllHotels = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, "You are not authenticated!"))

    try {
        const gotAllHotels = await Hotel.find()
        res.status(200).json(gotAllHotels)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//COUNT HOTELS BY CITY
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}
