const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/connect');

// Read favorites of user with id
recordRoutes.route("/api/favorites/:id").get(async function(req, res){
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("users")
    .findOne({uid: req.params.id}, function (err, result){
      if (err) {
        res.status(400).send("Error fetching favorites!");
      }
      else{
        console.log(result);
        res.json(result);
      }
    });
});

//Add favorites of user with id
recordRoutes.route("/api/addFavorite/:id").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const userQuery = {uid: req.params.id}
  const obj = {};
  obj["favorites."+Object.keys(req.body)[0]] = Object.values(req.body)[0];
  const updates = {
    $set: obj
  }
  const options = { upsert: true, returnDocument: "after" };
  console.log(req.params.id);
  console.log(req.body);
  dbConnect
    .collection("users")
    .findOneAndUpdate(userQuery, updates, options, function (err, result) {
      if (err){
        console.log(err);
        res.status(400).send("Error updating favorites with id ${userQuery.id}!");
      } 
      else{
        console.log("1 document updated");
        console.log(result.value);
        res.json(result.value);
      }
    });
});

recordRoutes.route("/api/removeFavorite/:id").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const userQuery = {uid: req.params.id}
  console.log(req.body)
  const updates = {
    $unset: req.body
  }
  const options = { upsert: true, returnDocument: "after" }
  dbConnect
    .collection("users")
    .findOneAndUpdate(userQuery, updates, options, function (err, result) {
      if (err){
        res.status(400).send("Error updating favorites with id ${userQuery.id}!")
      } 
      else{
        console.log("1 document updated");
        console.log(result.value);
        res.json(result.value);
      }
    });
});

//Remove favorites of user with id

module.exports = recordRoutes;