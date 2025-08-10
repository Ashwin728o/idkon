const express = require('express');
const router = express.Router();

const Message = require('../models/Message');
const { ensureAuthenticated  } = require('../middleware/auth');

router.get('/compose', ensureAuthenticated, (req, res) => {
  res.render('compose', { message: '' });
});

router.post('/compose', ensureAuthenticated, async (req, res) => {
  const { to, subject, body } = req.body;

  try {
const newMessage = new Message ({
  from: req.user.email,
  to,
  subject,
  body
});

 await newMessage.save();
 


    res.render('compose', { message: 'Message Send Successfully! ', Date} , );
  } catch (err) {
    console.error(err);
    res.render('compose', { message: 'Failed to send message.' });
  }
});

module.exports = router;