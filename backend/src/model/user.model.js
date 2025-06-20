import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },


    password: {
      type: String,
      required: [true, " Password is Required "],
    },

    refreshToken: {
      type: String,
    },

    role: { type: String, enum: ['patient', 'doctor'], required: true },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.isPasswordCorrect = async function(passwword){
    return await bcrypt.compare(passwword,this.password);
}


userSchema.methods.generateAccessToken = async function(){
      return   jwt.sign(
            {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCRESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCRESS_TOKEN_EXPIRY
        }

         )
       
}

userSchema.methods.genraterefreshToken = async function(){
 return  jwt.sign(
            {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        
         )
}


const User = mongoose.model("User", userSchema);


export {User}