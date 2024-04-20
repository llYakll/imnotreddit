const sequelize = require('./models/index');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');


// automatically check and sync tables
sequelize.sync({ force: false })  //false while developing to prevent dropping tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Failed to create database tables:', err);
    });