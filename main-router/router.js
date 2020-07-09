const express = require('express');
const clientRouter = require('../clients/routes');
const adminRouter = require('../admin/routes');
const restaurantsRouter = require('../restaurants/routes');
const carierRouter = require('../carier/routes');

// const desktopRouter = require('../public/desktopadmin/routes/routes');

const mainRouter = express();

mainRouter.use('/client', clientRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/restaurant', restaurantsRouter);
mainRouter.use('/carrier', carierRouter);

// mainRouter.use('/desktopadmin', desktopRouter);

module.exports = mainRouter;
