
var middlewareObj ={};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	    req.flash("error","Please login first!")
	    res.redirect("/login");
}


/////pozostałem middlewary here

module.exports = middlewareObj