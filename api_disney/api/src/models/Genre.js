const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('gener', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
      },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pict_asociat:{
        type:DataTypes.STRING,
        allowNull:false
    } ,
    tv_asoc:{
      type:DataTypes.STRING,
      allowNull:false
    }
  
 

  },
  {timestamps:false},
  {freezeTableName:true,}
  

   
  );
};
