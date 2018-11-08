var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//informacje dla uzytkownika
var flash = require("connect-flash");

//aurentykacja i logowanine
var passport = require("passport");
var LocalStrategy = require("passport-local");
// modele mongoose do bazy danych
var Photo = require("./models/photo");
var User = require("./models/user");



// konfiguracja passport passport-local
app.use(require("express-session")({
	secret: "Dawnno dawno temu",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB połączenie
mongoose.connect("mongodb://localhost/Album",  { useNewUrlParser: true });

// konfiguracja apki
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(flash());

//global function middleware!
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})



///wywalennie routów do osobnych plików
var photoRoutes = require("./routes/photos");
var authRoutes = require("./routes/index");
app.use(authRoutes);
app.use(photoRoutes);


//nasłuch serwera
app.listen(8080, function(){console.log("Server started")});