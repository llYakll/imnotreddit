const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

routes.use('/api/users',userRoutes);
routes.use('/api/posts',postRoutes);
routes.use('/api/comments',commentRoutes);
routes.use('/',homeRoutes);

module.exports = routes;