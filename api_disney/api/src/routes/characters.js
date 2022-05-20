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
    //console.log(charbd);
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
     let name=req.query.name;
    // console.log(name);
     let  CharTot= await getCharTot();
     let chargetnew=CharTot.map((e)=>{ // este  es el get para mostrar los personajes en gral 
      return{ 
              image:e.image,  
              name :e.name,
              edad: e.age,
              id:e.id,
              iddb: e.iddb
            }
     }); 
///////////////////////////########################query por name 
     if(name){
             const getBdCharacter= async () => {
                      return await Character.findAll({where:{name:name}
                                  })
                         };
                   let charName= await getBdCharacter();
                  // console.log(charName);
                    if(charName.length === 0){
                           return  res.status(404).send('Error no existe el personaje')
                         }else{
                  // console.log('hola');
                              res.send(charName)
                        } 

     };
     /////////////////////////////#################### query por edad
     let age=req.query.age; 
     if(age){
             const getBdCharacter= async () => {
                      return await Character.findAll({where:{age:age}
                    })
                 };
              let charAge= await getBdCharacter();
                  // console.log(charAge);
                if(charAge.length === 0){
                    return  res.status(404).send('Error no existe el personaje')
                   }else{
                  // console.log('hola');
                res.send(charAge)
                   }       
      }
   ////////////////////////############################### query por idMovie


     let movies=req.query.movies;
     console.log(movies)
      if (movies){
         console.log('hola')
         // const getBdMovie= async () => {
         //    //console.log
         //       let info= await Movies.findAll({});
         //       return info.data
         //    };
         let movieId= await Movies.findAll({});
         movieId=movieId.filter(e=>e.id == movies);
         let actor = movieId[0].char_asoc;
         console.log(actor);
        // movieId= movieId.filter(e => e.id == movies);
         
         
         

         if(!movieId){
            return res.status(404).send('no hay character')
         }else{
        // res.send(movieId);
        //  res.send('en esta pelicula trabaja');
          res.send(actor);
          }
      }
      else{
            res.send(chargetnew); 
          }

   ////////////////////////////////////////////////////////////////////////////
      
   //res.send(chargetnew);  
    }
     catch(error){next(error)} 
   })

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
   });



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
    
});


//#############################################################################################





module.exports = router; 