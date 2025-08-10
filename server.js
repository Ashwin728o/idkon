const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://kvnbharatha:grGtSHRpgGHxE1TR@cluster0.sjkopnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));














app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'imail_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/inbox'));
app.use('/', require('./routes/compose'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));