const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/redux-auth1');

const app = express();

const auth = require('./routes/auth');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './client/build')));

//setup express Sessions
//if using EXPRESS session, its set up must be before passport setup
//can set secure to true in production, it require htps, so use false in development
app.use(require('express-session')({
 secret: process.env.SESSION_SECRET || 'secret',
 resave: false,
 saveUninitialized: false,
 cookie: {
   httpOnly: false,
   secure: false
 }
}));

//setup passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/auth', auth);

//for any route other than the ones above
//render index.html in client/build folder
//in development, we run an express server, and a webpack dev server, completely seperated
// the proxy line in package.json, (anything not http request, send req to this location)
// proxy is linking react and express, it doesnt work in production  - saying trust everything
//script - build, run yarn build in client
//in production, we deploy exress app which has a prebuild bundle, dont need hot reloading
// build-production relate to deploying process - in server package.json
app.get('*', (request, response) => {
   response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
