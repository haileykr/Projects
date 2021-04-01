if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

const {buildingSchema, factSchema} = require('./schemas.js')

const Building = require('./models/building');
const Fact = require('./models/fact'); 
const User =require('./models/user');

const userRoutes = require('./routes/users');
const factRoutes = require('./routes/facts');
const buildingRoutes = require('./routes/buildings');

const MongoDBStore =require('connect-mongo').default;
// const { v4: uuid } = require('uuid'); //For generating ID's

const dbUrl =process.env.DB_URL || "mongodb://localhost:27017/citiesandbuildings"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

//To parse form data in POST req.body:
app.use(express.urlencoded({extended:true}));
//To parse incoming JSON in POST req.body:
app.use(express.json());
//To 'fake' PUT/PATCH/DELETE requests:
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

//Views folder and EJS Setup:
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(mongoSanitize({
    replaceWith: '_'
}));

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://en.wikipedia.org/api/",
    "https://cdn.jsdelivr.net"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://en.wikipedia.org/api/"
];
const fontSrcUrls = [
    'https://cdn.jsdelivr.net/npm/',
    'https://fonts.gstatic.com'
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dlhgkcxol/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://static.dezeen.com/uploads/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls]
        },
    })
);

const secret = process.env.SECRET || 'thisshouldbeabetterone!'
const store = MongoDBStore.create({
// const store = new MongoDBStore({
    mongoUrl: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60
})
store.on('error', function(e){
    console.log('error in session!', e);
})

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:  1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',userRoutes); 
app.use('/buildings',buildingRoutes);
app.use('/buildings/:id/funfacts',factRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*',(req,res, next)=> {
    next(new ExpressError('Page Not Found',404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Serving on port number ${port}!`);
});