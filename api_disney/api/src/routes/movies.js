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
    let nuevo= await Movies.findAll(); 
    let term=req.query.term;
    let title=req.query.title;
    let genre=req.query.genre;
    console.log(genre);
    let chargetnew=nuevo.map((e)=>{ // este  es el get para mostrar las peliculas
      return{ 
                id:e.id,
                image:e.image,  
                date:e.date
                
     }});

     if(!term && !title && !genre){return res.send(chargetnew)};
    //  ///################################## muestra  peli x tit/name query

     if(title){
        const getBdMovie= async () => {
            //console.log
               return await Movies.findAll({where:{title:title}
            })};
            let movieName= await getBdMovie();
           // console.log(movieName)
         if(movieName.length === 0){
           return  res.status(404).send('Error no existe el movie')
         }else{
            //console.log('hola');
            return  res.send(movieName)
            }  

     }
     //else{return res.send(chargetnew)};

// ////////////################################################# Peliculas ,query por id genero
    
     if(genre){
         console.log('hola');
         let generos= await Gener.findAll({});
         generos=generos.filter(e=>e.name == genre)
       
         return res.send(generos)
     }
          
   
//      //////////############################# ordena pelic por query
//      
     if(term){
        const getBdterm= async () => {
            //console.log
               return await Movies.findAll({})
                   };
        let movieterm= await getBdterm();
    //     console.log(movieterm);
    //     console.log(term);
        if(term === 'DESC'){ 
              //movieterm=movieterm.filter(e=>e.id);
              movieterm= movieterm.sort(function(a,b){
                                if(a.date > b.date){
                                    return -1;
                                }
                                if(b.date > a.date){
                                    return 1;
                                }
                                return 0;
                            }) 
              
        }else{
            movieterm=  movieterm.sort(function(a,b){
                              if(a.date> b.date){
                                return 1;
                               }
                               if(b.date > a.date){
                                return -1;
                               }
                               return 0;    
                               });
            
        } 
            return res.send(movieterm);
         }
    
      
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
    
});





module.exports = router;