require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
const userModel= require('./models/user')
const sequelize = new Sequelize(`postgres://postgres:1234@localhost/disneydb`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];
//const User=userModel(sequelize,sequelize);
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
console.log(sequelize.models)
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Character , Gener , Movies ,User } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Character.belongsToMany(Movies,{through:"character_movie",foreignKey:Character.iddb,otherKey:Movies.id});
Movies.belongsToMany(Character,{through:"character_movie",foreignKey:Movies.id,otherKey:Character.iddb});
Gener.belongsToMany(Character,{through:"genre_movie"});
Character.belongsToMany(Gener,{through:"genre_movie"});
Movies.belongsToMany(Gener,{through:"movie_genre"});
Gener.belongsToMany(Movies,{through:"movie_genre"});
User.belongsToMany(Character,{through:"character_user"});
Character.belongsToMany(User,{through:"character_user"});
module.exports = {
  ...sequelize.models,
   // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
