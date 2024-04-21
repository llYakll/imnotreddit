const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers/index');
require('dotenv').config(); // Load environment variables

const sequelize = require('./db/db');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const app = express();

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'handlebars');

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        // Connect to the database
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Sync models with the database
        await sequelize.sync({ force: true });
        console.log('Database synced.');

        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});