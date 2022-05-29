const { Router } = require("express");
const express = require("express");
const router = new express.Router();
const Contact = require("../models/contacts");
const multer=require('multer');
const { path } = require("express/lib/application");
const jwt=require('jsonwebtoken')
const auth = require("../middleware/auth");
router.post("/create-contact",auth,async(req,res)=>{
    const contact =new Contact(req.body);
    try {
        await contact.save();
        res.status(200).send({
          status: "ok",
          msg: "Successfully created contact",
          data: contact,
        });
      } catch (e) {
        res.status(400).send({
          status: "failed",
          msg: "Something went wrong" + e,
        });
      }

})

router.post("/create-multiple-contacts",auth,async(req,res)=>{
    Contact.insertMany(req.body).then((e)=>{
        res.status(200).send({
            status: "ok",
            msg: "Successfully created contacts",
            data: req.body,
          });
    }).catch((err)=>{
        res.status(400).send({
            status: "failed",
            msg: "Something went wrong",
          });
    })
    

})
router.get("/get-contacts",auth,async(req,res)=>{
       const skip=req.query.skip;
    try{
          const contacts=await Contact.find({}).limit(1).skip(parseInt(skip));
          res.status(200).send({"Contacts":contacts});

    }catch(err){
          res.status(400).send(err)
    }
})

router.get("/get-contact",auth,async(req,res)=>{
    try{
        const name=req.body.name;
        
        const contact=await Contact.find({"name":name})
       
        if(!contact) {
            return res.status(400).send({
              status: "failed",
              msg: "Doctor not found!",
              
            })
          }
          res.status(200).send({
            status: "ok",
            msg: "Successfully found the doctor",
            data: contact
          })

    }catch(err){
        res.status(400).send({
            status: "failed",
            msg: "Something went wrong!",
          });
    }
})

router.delete("/contact",auth,async(req,res)=>{
    try{
        const name=req.body.name;
        await Contact.findOneAndDelete({name:name})
        res.send(200);
    }catch(err){
          res.status(404).send({"error":err})
    }


})

router.patch("/contact",auth,async(req,res)=>{
    try{   
           const updates = Object.keys(req.body);
           const name=req.body.oldname;
           const contact=await Contact.findOne({name:name});
           updates.forEach((update)=>{
               contact[update]=req.body[update];
           })
           await contact.save();
           res.status(200).send(contact);
    }catch(err){
            res.status(404).send(err);
    }
})

router.post("/create-jwt-token",async(req,res)=>{
    const token=jwt.sign({name:req.body.name},"nadeem");
    res.status(200).send({"token":token});
})
const videoStorage = multer.diskStorage({
    destination: 'videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() )
    }
});
const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 10000000000 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }

})

router.post('/uploadVideo', videoUpload.single('video'), async(req, res) => {
    const contact=await Contact.findOne({name:"Athira B"});
    res.send(req.file.buffer)
    // contact.video=req.file;
    // await contact.save();
    // res.send(contact);
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 })

 router.get("/getvideo",async(req,res)=>{
     try{
        const a=await Contact.findOne({name:"Athira B"});
        res.send(a.video)
     }catch(err){

     }
 })
 

router.get('/video',async(req,res)=>{
    try{
  const user=await User.findById(req.params.id)
  res.set('Content-Type','video/mp4')
  res.send(user.avatar)
    }catch(err){

    }
})

module.exports = router;