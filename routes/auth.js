const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.get('/signup', (req, res) => res.render('signup', { message: req.flash('error') }));

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const email = `${username}@imail.com`;
  const existing = await User.findOne({ email });
  if (existing) {
    req.flash('error', 'Email already exists');
    return res.redirect('/signup');
  }
  const hashed = await bcrypt.hash(password, 10);
  await new User({ email, password: hashed }).save();
  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login', { message: req.flash('error') }));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/inbox',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

router.get('/', (req, res) => res.render('index', { user: req.user }));

module.exports = router;
