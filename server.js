const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport');


//connect to MongoDB Atlas
mongoose.connect(keys.mongoURI)

//execute server
const app = express();

//tell express to use cookies for authontication
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

//grab routers module
require('./routes/authRoutes')(app);

//define port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
