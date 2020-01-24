const express = require('express');
const multer = require('multer');
const uuid = require('uuid/v4');
const {format} = require('timeago.js');
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
require('./config/database');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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


app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination:path.join(__dirname, 'public/img/uploads'),
    filename:(req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({storage:storage}).single('image'));

//Global Variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
})



//Routes
require('./app/routes.js')(app, passport);

app.use(require('./routes-images/index'));



//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
    
})


mongoose.connect(url, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.error(err);
});

require('./config/passport')(passport);

