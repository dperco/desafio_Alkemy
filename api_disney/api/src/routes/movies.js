const { Router } = require('express');
const {Character,Gener,Movies}=require('../db');
const {Op, BOOLEAN}=require('sequelize');
const router = Router();
const axios = require('axios');


const getInfoApi= async () => { //trae info de la Api
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
        let charbd= await Movies.findAll({});  // charact de la BD
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
router.get('/',async(req,res,next)=>{
   try{
    let nuevo= await getCharTot(); 
    let chargetnew=nuevo.map((e)=>{ // este  es el get para mostrar las peliculas
      return{ 
                image:e.image,  
                pict_asoc:e.pict_asoc,
                tv_asoc:e.tv_asoc}
     });
      //res.send(aux);      
      res.send(chargetnew);
     //res.send(nuevo)
      }
     catch(error){next(error)} 
   });
//##############################################################################################
  
      //para el post
router.post('/',function(req,res){   //crear una pelicula
  
    try{
      
       console.log(req.body);
       const {id,image,title,date,rating,char_asoc}=req.body;
      
       let newchar=  Movies.create(
          { 
           id,
           image,
           title,
           date,
           rating,
           char_asoc     
                  
       })
       
       res.status(200).send({message:'movie creado'});
      }
      catch(error){console.log(error)} 
      })
       
//###############################################################################################
    
router.put('/:id',async(req,res)=>{   //modificar una pelicula
    await Movies.update(req.body,{
        where:{id:req.params.id}
    })
    res.send({message:'MOVIE modificado'});
})

//################################################################################################

router.delete('/:id',async(req,res)=>{  //eliminar un MOVIE
    const id=req.params.id;
    
    let elimna=await Movies.destroy({
        where:{id:id}
    })
    res.send({message:'MOVIE eliminado'});
    
})

//#####################################################################################
// router.get('/:title',async(req,res)=>{  //FILTRA UN movie POR titulo
//     console.log(req.params.title)
//     let title= req.params.title;
//     if(title){       
//        try{
//          const getBdMovie= async () => {
//         //console.log
//            return await Movies.findAll({where:{title:title}
//         })
//                };
//         let movieName= await getBdMovie();
//            console.log(movieName)
//         if(movieName.length === 0){
//           return  res.status(404).send('Error no existe el movie')
//         }else{
//            //console.log('hola');
//             res.send(movieName)
//            } 
        
           
//        }
//        catch(error){
//            res.status(404).send(error);
//        }
//     }})

//#############################################################################
// router.get('/:Genero',async(req,res)=>{  //FILTRA UN movie POR genero
//     console.log(req.params.Genero);
//     let Genero= req.params.Genero;
//     if(Genero){       
//        try{
//          const getBdGenero= async () => {
//         //console.log
//            return await Gener.findAll({where:{name:Genero}
//         })
//                };
//         let movieGener= await getBdGenero();
//            console.log('hola');
//         if(movieGener.length === 0){
//           return  res.status(404).send('Error no existe el genero')
//         }else{
//            //console.log('hola');
//             res.send(movieGener)
//            } 
        
           
//        }
//        catch(error){
//            res.status(404).send(error);
//        }
//     }})
//#############################################################################################

router.get('/:term',async(req,res)=>{  //FILTRA UN movie POR genero
    console.log(req.params.term);
    let term= req.params.term;
          
       try{
         const getBdterm= async () => {
        //console.log
           return await Movies.findAll({})
               };
        let movieterm= await getBdterm();
        if(term === 'ASC'){
           console.log('hola');
             movieterm=  movieterm.sort(function(a,b){
              if(a.id > b.id){
                return 1;
               }
               if(b.id > a.id){
                return -1;
               }
               return 0;    
               })
        } else{
            movieterm= movieterm.sort(function(a,b){
                if(a.id > b.id){
                    return -1;
                }
                if(b.id > a.id){
                    return 1;
                }
                return 0;
            }) 
        }  
       
        if(movieterm.length === 0){
          return  res.status(404).send('Error no existe el genero')
        }else{
           //console.log('hola');
            res.send(movieterm)
           } 
        
          
       }
       catch(error){
           res.status(404).send(error);
       }
    })


module.exports = router;