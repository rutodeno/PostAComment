
//var router = express.Router();
var Chirp = require("../models/chirp.js")

module.exports = function(app) {

  // Get all Post

  app.get("/api/all", function(req, res) {


    Chirp.findAll({}).then(function(results) {
      res.json(results);
      //console.log(results);
    });

  });

  // Add a Post

  app.post("/api/new", function(req,res){

    console.log("Chirp Data:");
    console.log(req.body);

    Chirp.create({
      author: req.body.author,
      body: req.body.body,
      created_at: req.body.created_at
    }).then(function() {
      res.end();
    });

  });

  app.post("/api/reply", function(req, res) {

    console.log("Reply: ");
    Chirp.create({
      postId: "",
      replyBody: "",

    }).then(function() {
      res.end();
    });
  });
};
