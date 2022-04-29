const { Router } = require('express');
const charactersRouter= require('./characters');
const moviesRouter= require('./movies');
const generesRouter= require('./genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters',charactersRouter);
router.use('/movies',moviesRouter);
router.use('/genres',generesRouter);





module.exports = router;
