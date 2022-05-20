const { Router } = require('express');
const router = Router();
const {User} = require ('../db');
const bcrypt= require('bcrypt');
const {check ,validationResult}= require('express-validator');
const moment=require('moment');
const jwt = require('jwt-simple');
const nodemailer=require('nodemailer');


router.post('/register',[
    check('username','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','la pasword es obligatoria').not().isEmpty()
], 
function (req,res){ 
    try{
      const errors= validationResult(req)
      
      let  password=req.body.password;
      password=bcrypt.hashSync(password,10);
      let username=req.body.username;
      let email=req.body.email;
      
       if(!errors.isEmpty()){
           return res.status(422).json({errores : errors.array()})
       }
      let user= User.create({
                username:username,
                email:email,
                password:password
      });
      res.status(200).json('user creado');
      
    }
    catch(error){console.log(error)}

})

router.post('/login',async (req,res)=>{ 
    let {username,email,password}=req.body;
    console.log(email,password,username);
    let user=await  User.findAll({where:{username:username}});
    console.log(user);
    if(user){
      const igual=bcrypt.compareSync(password,user[0].password);
      console.log(igual);
       if(user[0].username === username && igual && user[0].email === email){
         res.status(200).json({success: createToken(user[0])});
          // var transporter= nodemailer.createTransport({
          //       host:"smtp.gmail.com",
          //       port: 587,
          //       secure:false,
          //       auth:{
          //           user:'danielperco4@gmail.com',
          //           pass:'ktwwtdtrwtzjpicn'
          //       }
          //   });
            
          //   var mailOptions={
          //       from :'"server Api"<danielperco4@gmail.com>',
          //       to : payload.usermail,
          //       subject:"server Api",
          //       text:'Bienvenido a Api Dysney '
          //   };
          //   console.log('hola');
          //  await  transporter.sendMail(mailOptions,(error,info)=>{
          //           if(error){
          //                return res.status(500).json(error.message);
          //           }else{
              
          //             console.log('emial enviado',info.response);
          //             return  res.status(200).jsonp(req.body);
          //           }
            
          //       })  
          //   //     console.log('emial enviado');
          //   // next();




       }else{
       return  res.status(404).json('el usuario  es invalido')
       }
    }else{
       return  res.status(404).json('el usuario/pas  es invalido')
    };
 
 function createToken (user){   //creo el token
     const payload={
             userId:user.id,
             usermail:user.email,
             createdAt:moment().unix(),
             expiredAt:moment().add(30,'minutes').unix()
     }
     return jwt.encode(payload,'clave secreta');

 };


})

module.exports = router;