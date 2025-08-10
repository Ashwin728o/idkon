const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const User = require('../models/User')
module.exports = function (passport) {
  
  passport.use(new LocalStrategy(async (username, password, done) => {
    const email = `${username}@imail.com`;
    const user = await User.findOne({email});
    if(!user) return done(null, false, {message: 'EMAIL NOT REGISTERED'});

    const isMatch = bcrypt.compare(password, user.password);
    return isMatch ? done(null, user): done(null, false, {message:'Password Incorrect'})
  }));

  
  


passport.serializeUser((user, done)=> done(null, user.id))

passport.deserializeUser(async (id, done) => done(null, await User.findById(id)));


  
    
}
