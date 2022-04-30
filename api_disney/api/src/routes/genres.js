const { Router } = require('express');
const {Character,Gener,Movies}=require('../db');
const {Op}=require('sequelize');
const router = Router();
const axios = require('axios');




// const getInfoApi= async () => { 
//     let page=1;
//     let api=`https://api.disneyapi.dev/characters?page=${page}`;
//     let videoApi=[];
//     for(let i=1; i < 5 ;i++){ 
//            let  infoUrl= await axios.get(api);
//            //console.log(infoUrl);
//         //api=infoUrl.data.next
     
//          videoApi[i] = infoUrl.data.data.map(el=>{
//                            return{               
//                              image:el.imageUrl,
//                              id:el._id,
//                              name: el.name, 
//                              pict_asoc:el.films,
//                              tv_asoc:el.tvShows  
//                    }});
//         //console.log(videoApi[i]);
//         page=i;
//         api=`https://api.disneyapi.dev/characters?page=${page}`;
//        }

//      return videoApi;
//     } ;     
    
 

router.get('/',async(req,res)=>{
   try{
      let totgener= await Gener.findAll({});
              
      //res.send('hola');
     res.send(totgener)
      }
     catch(error){console.log(error)} 
   });
   
//###################################################################################################3  
        

 router.post('/', function(req, res) {
    console.log(req.body);
    const {name,image,pict_asociat,tv_asoc}=req.body;
     
    let newchar=  Gener.create(
          {   
               name, 
               image,  
               pict_asociat, 
               tv_asoc
         })

    res.status(200).send({message:'Producto se ha recibido'});
  });


module.exports = router;