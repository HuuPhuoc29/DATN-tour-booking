import Users from "../models/User.js";

//UPDATE
export const updateUsers = async (req, res, next) => {
    try {
        const updatedUsers = await Users.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body}, 
            { new: true }
        )
        res.status(200).json(updatedUsers)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//DELETE
export const deleteUsers = async (req, res, next) => {
    try {
        await Users.findByIdAndDelete(
            req.params.id, 
            { $set: req.body}, 
            { new: true }
        )
        res.status(200).json("Delete successfully")
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET
export const getUsers = async (req, res, next) => {
    try {
        const gotUsers = await Users.findById(req.params.id)
        res.status(200).json(gotUsers)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}

//GET ALL
export const getAllUserss = async (req, res, next) => {
    // const failed = true
    // if(failed) return next(createError(401, "You are not authenticated!"))

    try {
        const gotAllUserss = await Users.find()
        res.status(200).json(gotAllUserss)
    } catch(err) {
        // res.status(500).json(err)
        next(err)
    }
}