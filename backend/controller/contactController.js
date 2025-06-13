const Contact = require('../models/contactSchema')

const submitContact = async(req,res)=>{
    const {username, email, message} = req.body;
    try {
if(   !username || !email || !message){
    return res.status(400).json({msg : 'All fields are required'})
}

        const contact = await Contact.create({username, email, message});
        res.status(201).json({msg : 'Contact Submitted', contact})
    } catch (error) {
        console.log(error,'contact error')
        res.status(500).json({msg : 'Server Side Error in Contact'})
    }
}

module.exports = {submitContact}