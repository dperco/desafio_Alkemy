const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movies',{
     id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       primaryKey:true
     },
      image: {
        type: DataTypes.TEXT,
        
      },
      title:{
        type:DataTypes.STRING,
        allowNull:false   
      },
      date:{
        type:DataTypes.DATE,
        allowNull:false
       },
       rating:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    char_asoc:{
        type:DataTypes.STRING,
        
    }
    });
};
