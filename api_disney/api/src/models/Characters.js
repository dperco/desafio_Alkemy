const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {

    iddb:{type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true

     },
    image:{
       type: DataTypes.TEXT,
       allowNull:false
     },
     id:{
        type:DataTypes.INTEGER,
        allowNull:false

        },
      name:{ 
         type:DataTypes.STRING,
         allowNull:false
       },
      age:{
         type:DataTypes.STRING,
       },
       weight:{
           type:DataTypes.STRING,
    
    
         },
         history:{
             type:DataTypes.STRING,
      
        },
        pic_asoc:{
           type:DataTypes.STRING,
            allowNull:false   
          },
        tv_asoc:{
            type:DataTypes.STRING,
            allowNull:false  
           }
},
{timestamps:false},
{freezeTableName:true,}

);
};
