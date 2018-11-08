var express = require("express");
var router = express.Router({mergeParams:true}); 
var passport = require("passport");
var User = require ("../models/user");
var Photo = require ("../models/photo");

router.get("/", function(req, res){
	res.render("landing")
});

router.get("/photos", function(req, res){

	 Photo.find({}, function (err, allPhotos){
	   if(err){console.log(err);
	   } else{
	   		 res.render("photos", {photos:allPhotos})
			 }
     });
});

// auth routes
router.get("/register", function(req, res){
	res.render("register");
});

//register nnew user route and thenn log in
router.post("/register", function(req, res){


    var newUser = new User({username: req.body.username, email:req.body.email})
	User.register(newUser, req.body.password, function (err,user){
		if(err){
				req.flash("error",err.message);
				return res.render("register")
	           }
	           passport.authenticate("local")(req,res,function(){
	           	req.flash("success","hello "+req.body.username)
	           	res.redirect("/photos")
	           });
	});
});
//////////////////////////////////////////////


router.post("/login", passport.authenticate("local",
	{successRedirect:"/photos",
     failureRedirect:"/login",
}), function(req, res){
});

router.get("/login", function(req, res){
	
  res.render('login');
});

router.get("/logout", function(req, res){
	req.logout();
  res.redirect('photos');
});



module.exports = router;