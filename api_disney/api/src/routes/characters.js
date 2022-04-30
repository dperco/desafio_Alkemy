const { Router } = require('express');
const {Character,Gener,Movies}=require('../db');
const {Op}=require('sequelize');
const router = Router();
const axios = require('axios');





const getInfoApi= async () => { // trae personajes de la Api 
    let page=1;
    let api=`https://api.disneyapi.dev/characters?page=${page}`;
    let videoApi=[];
    for(let i=1; i < 5 ;i++){ 
           let  infoUrl= await axios.get(api);
           //console.log(infoUrl);
        //api=infoUrl.data.next 
     
         videoApi[i] = infoUrl.data.data.map(el=>{
                           return{               
                             image:el.imageUrl,
                             id:el._id,
                             name: el.name, 
                             pict_asoc:el.films,
                             tv_asoc:el.tvShows  
                   }});
        //console.log(videoApi[i]);
        page=i;
        api=`https://api.disneyapi.dev/characters?page=${page}`;
       }

     return videoApi;
    } ;     
  const getCharTot= async () =>{
    let newchar=await getInfoApi();// traigo todos  los  charact
    let charbd= await Character.findAll({});  // charact de la BD
    let aux=[];
    aux=newchar.filter(e=> e[1]);  //saco los null 
    let nuevo=[]; 
    for(let i=0;i < 4 ;i++){// creo el arrray  puro  
       nuevo = nuevo.concat(aux[i]);
    };
     let totalChar=nuevo.concat(charbd);// character de la API + BD
     return totalChar;
  }
 //###########################################################################################

router.get('/',async(req,res,next)=>{   //  listado gral  de personajes 
   try{
    
     let  CharTot= await getCharTot()
    let chargetnew=CharTot.map((e)=>{ // este  es el get para mostrar los personajes en gral 
      return{ image:e.image,  
              name :e.name,}
     }); 
     res.send(chargetnew);
    }
     catch(error){next(error)} 
   });
   
  
      
//###############################################################################################       

    
    
//para el post
router.post('/',function(req,res){   //crear un personaje
  
 try{
   
    console.log(req.body);
    const {image,id,name,age,weight,history,pic_asoc,tv_asoc}=req.body;
   
    let newchar=  Character.create(
       { 
        image,
        id,
        name,
        age,
        weight,
        history,
        pic_asoc,
        tv_asoc  
        
               
    })
    
    res.status(200).send({message:'personaje creado'});
   }
   catch(error){console.log(error)} 
   })

// router.post('/', function(req, res) {
//     console.log(req.body);
//     res.status(200).send({message:'Producto se ha recibido'});
//   });

///##############################################################################################
router.put('/:id',async(req,res)=>{   //modificar un personaje
    await Character.update(req.body,{
        where:{id:req.params.id}
    })
    res.send({message:'personaje modificado'});
})

//#################################################################################################
router.delete('/:id',async(req,res)=>{  //eliminar un personaje
    const id=req.params.id;
    
    let elimna=await Character.destroy({
        where:{id:id}
    })
    res.send({message:'personaje eliminado'});
    
})


//#############################################################################################
// router.get('/:age',async(req,res)=>{  //FILTRA UN personaje POR age
   
// let age=req.params.age;
// console.log(age);
// if(age){ 
//     console.log('hola') ;     
//     try{
//       const getBdCharacter= async () => {
     
//      return await Character.findAll({where:{age:age}})
//  };
//  let charAge= await getBdCharacter();
//   console.log(charAge);      
//      if(charAge.length === 0){
//        return  res.status(404).send('Error no existe el personaje')
//      }else{
//         //console.log('hola');
//          res.send(charAge)
//         } 
//    //res.send(charId)     
//    }
//    catch(error){
//        res.status(404).send(error);
//    }
// }})

//######################################################################################################
// router.get('/:name',async(req,res)=>{  //FILTRA UN personaje POR name
//     console.log(req.params.name)
//     let name=req.params.name;
//     if(name){       
//        try{
//          const getBdCharacter= async () => {
//               return await Character.findAll({where:{name:name}
//         })
//     };
//     let charName= await getBdCharacter();
           
//         if(charName.length === 0){
//           return  res.status(404).send('Error no existe el personaje')
//         }else{
//            //console.log('hola');
//             res.send(charName)
//            } 
        
           
//        }
//        catch(error){
//            res.status(404).send(error);
//        }
//     }})

//#############################################################################################


router.get('/:weight',async(req,res)=>{  //FILTRA UN personaje POR weigth
    
    let {weight}=req.params;
    if(weight){       
        try{
          const getBdCharacter= async () => {
                return await Character.findAll({where:{weight:weight}
                 })
          };
          let charWeight= await getBdCharacter();
            
          if(charWeight.length === 0){
             return  res.status(404).send('Error no existe el personaje')
         }else{
            //console.log('hola');
             res.send(charWeight)
            } 
            
        } 
        catch(error){
           res.status(404).send(error);
       }
    }})


module.exports = router; 