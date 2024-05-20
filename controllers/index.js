const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

routes.use(userRoutes);
routes.use(postRoutes);
routes.use(commentRoutes);
routes.use(homeRoutes)

module.exports = routes;