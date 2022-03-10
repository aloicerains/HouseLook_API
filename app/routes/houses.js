// Route definition for houses
module.exports = app => {
  const houses = require('../controllers/houses.js');
  const router = require('express').Router();
  // create a new house
  router.post('/houses', houses.create);
  // Retrieve all houses
  router.get('/houses', houses.findAll);
  // Retrieve all vacant houses
  router.get('/houses/vacant', houses.findVacancy);
  // Retrieve a house of given id
  router.get('/houses/:id', houses.findOne);
  // update a single house with an id
  router.put('/houses/:id', houses.update);
  // delete a single house with an id
  router.delete('/houses/:id', houses.delete);
  // delete all houses
  router.delete('/houses', houses.deleteAll);
  // Retrieve vacant houses in a place
  router.get('/places/:id/houses/vacant', houses.placeVacancies);
  // Retrive houses in a place
  router.get('/places/:id/houses', houses.placeHouses);
  app.use('/api/v1', router);
};
