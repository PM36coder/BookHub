const Like = require('../models/likeModel');

const likeToggle = async (req, res) =>{
    const userId = req.user.userId;
    const {googleId} = req.body;

    if(!googleId) return res.status(400).json({msg : 'GoogleId is required'})

        try{
            const existingLike = await Like.findOne({user:userId, googleId :googleId})

            if(existingLike){
                await existingLike.deleteOne();
                res.status(200).json({msg: 'Book disliked'})
            }else{
                const newLike = new Like({user: userId, googleId});
                await newLike.save()
                res.status(200).json({msg:'Book Liked' , newLike})
            }
        }catch(error){
            console.log(error);
            res.status(500).json({msg : 'server side error like mein'})
        }
}

module.exports = {likeToggle}