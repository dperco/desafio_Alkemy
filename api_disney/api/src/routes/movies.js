const { Router } = require('express');
const {Character,Generes,Movies}=require('../db');
const {Op, BOOLEAN}=require('sequelize');
const router = Router();
const axios = require('axios');

// const bodyParser = require('body-parser');


// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// // POST /login gets urlencoded bodies
// router.post('/', urlencodedParser, function (req, res) {
//   res.send('welcome, ' + req.body.image)
//   res.send('welcome, ' + req.body.id)
//   res.send('welcome, ' + req.body.name)
//   res.send('welcome, ' + req.body.age)
//   res.send('welcome, ' + req.body.weight)
//   res.send('welcome, ' + req.body.history)
//   res.send('welcome, ' + req.body.pict_asoc)
//   res.send('welcome, ' + req.body.tv_asoc)
// })
// // POST /api/users gets JSON bodies
// router.post('/', jsonParser, function (req, res) {
//   // create user in req.body
//   let newpost= Character.create(
//    { 
//            image,
//            id,
//            name,  
//            age,
//            weight, 
//            history,   
//            pict_asoc, 
//            tv_asoc
// })
// res.send(newpost)
// })


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
    
 

// router.get('/',async(req,res,next)=>{
//    try{
//       let newchar=await getInfoApi();// traigo todos  los  charact
     
//       let aux=[];
//       aux=newchar.filter(e=> e[1]);  //saco los null  
      
//       let nuevo=[];

      

   
//    for(let i=0;i < 4 ;i++){// creo el arrray  puro  
//       nuevo = nuevo.concat(aux[i]);
//    };

  

 
//     let chargetnew=nuevo.map((e)=>{ // este  es el get para mostrar los personajes
//       return{ image:e.image,  
//               name :e.name,}
//      });
              
//       res.send(chargetnew);
//      //res.send(nuevo)
//       }
//      catch(error){next(error)} 
//    });
   
  
      
       

    
    
// // //para el post
// // router.post('/',async(res,req)=>{
  
// //  try{
// //    let charact=await getInfoApi();
// //    console.log(req.body);
// //    const {image,id,name,pict_asoc,tv_asoc}=req.body;
     
// //     let newchar= await Character.create(
// //        { 
// //                image:image,
// //                id:id,
// //                name:name,  
// //                age:'',
// //                weight:'', 
// //                history:'',   
// //                pict_asoc: pict_asoc, 
// //                tv_asoc:tv_asoc
// //     })
    
// //     res.send(newchar());
// //    }
// //    catch(error){console.log(error)} 
// //    })


module.exports = router;