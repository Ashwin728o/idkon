const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/inbox', ensureAuthenticated, async (req, res) => {
  const messages = await Message.find({ to: req.user.email });
  res.render('inbox', { user: req.user, messages });
});

router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Message.deleteOne({ _id: req.params.id, to: req.user.email });
    res.redirect('/inbox');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting message');
  }
});

module.exports = router;