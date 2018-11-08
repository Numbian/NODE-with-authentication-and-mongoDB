var express = require("express");
var router = express.Router({mergeParams:true}); 
var User = require ("../models/user");
var Photo = require ("../models/photo");

var middleware = require ("../middleware");



router.get("/photos/new", function(req, res){
	res.render("new");
});

router.post("/photos", function(req, res){
	var name = req.body.name
	var image = req.body.image
	var newPhoto = {name:name, image:image}
	
    Photo.create(newPhoto, function(err, newPhoto){
    	if(err){console.log(err)
    	} else {res.redirect("/photos")}
    })	
});

  router.get("/photos/:id", function(req, res){
  var id = req.params.id;
  Photo.findOne({_id:id}, function (err, found){
	   if(err){res.send(err);
	   } else{
	   		 // res.send(found);
	   		 res.render("show",{photo:found})
			 }
     });
  });

router.post("/photos/:id", function(req, res){
  var id = req.params.id;

   var updatedPhoto={name:req.body.name, image:req.body.image}
  Photo.findOneAndUpdate({_id:id}, updatedPhoto, function (err, found){
	   if(err){res.send(err);
	   } else{
	   		 // res.send(found);
	   		 res.redirect("/photos/"+id)
			 }
     });
  });

router.post("/photos/:id/delete", function(req, res){
  var id = req.params.id;

  Photo.findOneAndDelete({_id:id}, function (err, found){
	   if(err){res.send(err);
	   } else{
	   		 // res.send(found);
	   		 res.redirect("/photos")
			 }
     });
  });


  router.get("/photos/:id/edit", function(req, res){
  var id = req.params.id;
  Photo.findOne({_id:id}, function (err, found){
	   if(err){res.send(err);
	   } else{
	   		 // res.send(found);
	   		 res.render("edit",{photo:found})
			 }
     });
  });

 
module.exports = router;