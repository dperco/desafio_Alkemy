const { Router } = require('express');
const charactersRouter= require('./characters');
const moviesRouter= require('./movies');
const generesRouter= require('./genres');
const userRouter= require('./user');
const middleware=require('./middleware');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters',middleware.checkToken,charactersRouter);
router.use('/movies',middleware.checkToken,moviesRouter);
router.use('/genres',generesRouter);
router.use('/auth/',userRouter); 






module.exports = router;
