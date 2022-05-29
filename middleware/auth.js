const jwt=require('jsonwebtoken')
const Contact = require('../models/contacts')

const auth=async(req,res,next)=>{
    try{
        const token=req.header("Authorization").replace('Bearer ','')
        const decoded=jwt.verify(token,'nadeem')

        const contact=await Contact.findOne({"name":decoded.name})
        if(!contact){
            throw new Error()
        }
        req.contact=contact;
        next();
    }catch(errr){
        res.status(404).send({error:"Please authenticate"})
    }
}
module.exports=auth