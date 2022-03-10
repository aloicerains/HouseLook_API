// places routes
module.exports = app => {
  const places = require('../controllers/places.js');
  const router = require('express').Router();
  // create a new Place
  router.post('/places', places.create);
  // Retrieve all places
  router.get('/places', places.findAll);
  // Retrive a single place with an id
  router.get('/places/:id', places.findOne);
  // update a single place with an id
  router.put('/places/:id', places.update);
  // delete a single place with an id
  router.delete('/places/:id', places.delete);
  // delete all places
  router.delete('/places', places.deleteAll);
  app.use('/api/v1', router);
};
