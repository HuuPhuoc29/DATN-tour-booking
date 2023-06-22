import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

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
    const { min, max, ...others} = req.query;

    try {
        // const gotAllHotels = await Hotel.find(req.query).limit(req.query.limit)
        
        const gotAllHotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1000, $lt: max || 9999999 },
          }).limit(req.query.limit);

        // const gotAllHotels = await Hotel.find(req.query)
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

//COUNT HOTELS BY TYPE
export const countByType = async (req, res, next) => {
    try {
        
        const hotelCount = await Hotel.countDocuments({ type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        
        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET ROOMS OF HOTEL
export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };