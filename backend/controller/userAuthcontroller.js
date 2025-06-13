const User = require('../models/usertSchema');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
 
const  register = async (req, res) =>{
 try{
 const { username, email ,phone, password} = req.body;
 if(!username || !email || !phone||  !password){
   return res.status(400).json({msg: "All fields are required"});
 }
//! check if details are already in database
const existsEmail = await User.findOne({email : email});
if(existsEmail){
    return res.status(400).json({msg : "Email already exists"})
}

const existsPhone = await User.findOne({phone : phone});
if(existsPhone){
    return res.status(400).json({msg : "Phone already exists"})
}

const user = new User({username, email ,phone, password})
await user.save();

//! token for user is that user 
const token = jwt.sign(
   {userId : user._id, email: user.email, username: user.username},
   process.env.JWT_TOKEN,
   {expiresIn: '1d'}
)

// sending data to frontend 
res.status(201).json({msg : "Registration successful" , user, token})

 }catch(error){
    console.log("error in register", error)
    //!handle duplicate ey error (just in some case)
if(error.code === 11000){
   const field = Object.keys(error.keyValue)[0];
   return res.status(400).json({msg: `${field} already exists`})
}
    res.status(500).json({msg: "server side error"})
 }
} 

const login = async (req, res) =>{
     const {email, password} = req.body;
//! check user is registered or not 
     try{
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(401).json({})
        }

        //? check the password is same or not
      const passwordMatch = await bcrypt.compare(password, user.password)

     if(!passwordMatch){
      return res.status(401).json({msg : "invalid credentials"})
      }
//! token
      const token = jwt.sign(
   {userId : user._id, email: user.email, username: user.username},
   process.env.JWT_TOKEN,
   {expiresIn: '1d'}
)
       res.status(200).json({msg : "Login successful" , user , token})
     }catch(error){
        console.log("Error in Login" , error)
        res.status(500).json({msg: "server side error"})
     }
}

const user = async (req, res) => {
  const userId = req.user.userId; // Fix here

  const user = await User.findById(userId).select('email username');

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    message: "User data fetched successfully",
    user: {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
  });
};

module.exports = {register,login,user}