const Comment = require('../models/commentModel')

const addComment = async (req, res) =>{
 const {googleId, text}  = req.body
 const userId = req.user.userId;

 if(!googleId || !text) return res.status(400).json({msg : "text is required"})
    

    try{
        const newComment = new Comment({user: userId , googleId, text})
        await newComment.save()
        res.status(201).json({msg : "commented" , newComment})
    }catch(error){
        console.log(error , 'comment error');
        res.status(500).json({msg: 'comment section have error'})
    }
}

const getComment = async (req, res) =>{
    const {googleId}  = req.params;
    try{
        const comments = await Comment.find({googleId}).populate('userId','username').sort({ createdAt: -1 })
        res.status(200).json({comments})
    }catch(error){
        console.log(error, 'getCommnet mein error')
        return res.status(500).json({msg: error.message})
    }
}

module.exports = {addComment,getComment}