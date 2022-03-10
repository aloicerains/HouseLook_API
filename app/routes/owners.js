// Route definition for Owners
module.exports = app => {
  // import controllers
  const owners = require('../controllers/owners.js');
  // create router
  const router = require('express').Router();
  // route to creating owner
  router.post('/owners', owners.create);
  // route to obtain all owners
  router.get('/owners', owners.getAll);
  // route to obtain single owner
  router.get('/owners/:id', owners.getById);
  // route to update owner
  router.put('/owners/:id', owners.update);
  // route to delete house owner
  router.delete('/owners/:id', owners.delete);
  // route to get house owner
  router.get('/houses/:id/owners', owners.getHouseOwner);
  // configure route with app
  app.use('/api/v1', router);
};
