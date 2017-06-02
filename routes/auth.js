const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//middleware - which receive same req as the routers
//next is a function - saying the middleware is done, go to the next line of code
const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ }) //empty{ } represents logged out user
}

//Helper function to whitelist attributes
const userAttrs = (user) => {
  const { _id, username, role } = user;
  return { _id, username, role };
}


//anything other than password, goes to where username is in, with "," seperating
router.post('/signup', (req, res) => {
  let { email, password } = req.body;
  User.register(new User({username: email}), password, (err, user) => {
    if (err)//might not save, eg, err if user already exist
      return res.status(500).json(err);

    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      return res.json(userAttrs(user));
    });
  });
});

//logIn will create a session
// this session will attach to each request
router.post('/signin', (req, res) => {
 let { email, password } = req.body
 User.findOne({ username: req.body.email}, (err, user) => {
   user.authenticate(req.body.password, (err, user, passwordErr) => {
     if (err)
       return res.json(500, 'User not found');
     if (passwordErr)
       return res.json(500, passwordErr.message)

     req.logIn(user, (err) => {
       return res.json(userAttrs(user));
     })
   });
  });
});

// kill the session
router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});

//isAuthenticated - a middleware
router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user)
});

module.exports = router;
