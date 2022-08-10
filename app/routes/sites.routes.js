
module.exports = app => {
  const sites = require('../controllers/sites.controllers.js')

  let router = require("express").Router();

  // app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  // route to create a new site
  router.post('/new-site', sites.create);

  // route to get all sites
  router.get('/sites', sites.findAll);

  // route to get token from the script tag and render main.js
  router.get('/embed/:token', sites.main);

  // route to render frame.html file
  router.get('/embed/frame/:site_id/:user_id', sites.frame);

  // route to render toolbar.html file
  router.get('/embed/toolbar/:site_id/:user_id', sites.toolbar);

  //route to sort sites by site_name
  router.get('/sortname', sites.sortName);

  //router to sort newest sites
  router.get('/sortnewest', sites.sortNewest);

  //router to sort oldest sites
  router.get('/sortoldest', sites.sortOldest);

  app.use(router);
};