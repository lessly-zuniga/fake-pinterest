const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database.js');


//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// required for passport
app.use(session({
	secret: 'fakepinteres',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Routes
require('./app/routes.js')(app, passport);


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
    
})


mongoose
.connect(url, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.error(err);
});

require('./config/passport')(passport);

