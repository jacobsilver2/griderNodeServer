const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//this order matters!  Make sure you import the defined model before trying to use it.
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

//! all of these app.use statements are express middlewares

app.use(
    bodyParser.json()
)
app.use(
    cookieSession({
        // 30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT);