import Tour from "../models/Tour.js";

//CREATE
export const createTour = async (req, res, next) => {
    const newTour = new Tour(req.body)
    
    try {
        const savedTour = await newTour.save()
        res.status(200).json(savedTour)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//UPDATE
export const updateTour = async (req, res, next) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true },
            { upsert: true }
        )
        res.status(200).json(updatedTour)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//DELETE
export const deleteTour = async (req, res, next) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(200).json("Delete successfully")
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET
export const getTour = async (req, res, next) => {
    try {
        const gotTour = await Tour.findById(req.params.id)
        res.status(200).json(gotTour)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET ALL
export const getAllTours = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, "You are not authenticated!"))
    const { min, max, ...others} = req.query;

    try {
        // const gotAllTours = await Tour.find(req.query).limit(req.query.limit)
        
        const gotAllTours = await Tour.find({
            ...others,
            price: { $gt: min | 1000, $lt: max || 9999999 },
          }).limit(req.query.limit);

        // const gotAllTours = await Tour.find(req.query)
        res.status(200).json(gotAllTours)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//COUNT TourS BY CITY
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")

    try {
        const list = await Promise.all(cities.map(city => {
            return Tour.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}