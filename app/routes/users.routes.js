
module.exports = app => {
  const users = require("../controllers/users.controllers.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/signup", users.create);

  //  Log in to your account
  router.post("/signin", users.findOne);

  // route for getting users based on site_id.
  router.get("/assignee", users.find)

  app.use(router);
};
