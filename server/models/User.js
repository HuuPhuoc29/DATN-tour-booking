import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
      required: false,
    },
    // gender: {
    //   type: Sequelize.ENUM('male', 'female', 'undefined'),
    //   allowNull: true,
    // },
    country: {
      type: String,
      required: false,
      // required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: false,
      // required: true,
    },
    phone: {
      type: String,
      required: false,
      // required: true,
    },
    password: {
      type: String,
      required: true,
      //bcrypt.js 5045
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: { 
      type: Boolean,
      default: false 
    },    
    verificationToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
