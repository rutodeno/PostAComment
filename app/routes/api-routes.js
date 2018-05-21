// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
//var connection = require("../config/connection.js");

var Chirp = require("../models/chirp.js")
// Routes
// =============================================================
module.exports = function(app) {

  // Get all chirps

    app.get("/api/all", function(req, res) {
      // var dbQuery = "SELECT * FROM chirps";

      // connection.query(dbQuery, function(err, result) {

      //   if (err) throw err;
        
      //   res.json(result);

      //   console.log(result.body);
      // });

      Chirp.findAll({}).then(function(results) {
        res.json(results);
      });

    })

  // Add a chirp

  app.post("/api/new", function(req,res){

    console.log("Chirp Data:");
    console.log(req.body);

    // var dbQuery = "INSERT INTO chirps (author, body, created_at) VALUES (?, ?, ?)";

    // connection.query(dbQuery, [req.body.author, req.body.body, req.body.created_at], function(err, result) {

    //     if(err) throw err;

    //     console.log("Chirp saved !");

    //     res.end();
    // });

    Chirp.create({
      author: req.body.author,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function() {
      res.end();
    })

  });
};
