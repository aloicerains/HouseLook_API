// rooms route definition
module.exports = app => {
  // import controllers
  const rooms = require('../controllers/rooms.js');
  // create router
  const router = require('express').Router();
  // creating room
  router.post('/rooms', rooms.create);
  // get all rooms
  router.get('/rooms', rooms.getAll);
  // get all vacant rooms
  router.get('/rooms/vacant', rooms.getAllVacant);
  // Get all single rooms
  router.get('/rooms/singles', rooms.getAllSingles);
  // Get all bed sitters
  router.get('/rooms/bedsitters', rooms.getAllSitters);
  // Get all one bedrooms
  router.get('/rooms/onebedrooms', rooms.getAllOnebeds);
  // Get all two bedrooms
  router.get('/rooms/twobedrooms', rooms.getAllTwobeds);
  // get room by id
  router.get('/rooms/:id', rooms.getById);
  // update all room information
  router.put('/rooms/:id', rooms.update);
  // delet a room
  router.delete('/rooms/:id', rooms.delete);
  // Get all rooms in a given place
  router.get('/places/:id/rooms', rooms.getPlaceRooms);
  // Get all vacant rooms in a place
  router.get('/places/:id/rooms/vacant', rooms.getPlaceVacant);
  // Get all single rooms in a place
  router.get('/places/:id/rooms/singles', rooms.getSingle);
  // Get all bed sitters in a place
  router.get('/places/:id/rooms/bedsitters', rooms.getSitter);
  // Get all one bed rooms in a place
  router.get('/places/:id/rooms/onebedrooms', rooms.getOnebed);
  // Get all two bed rooms in a place
  router.get('/places/:id/rooms/twobedrooms', rooms.getTwobed);
  // Get all vacant rooms in a house
  router.get('/houses/:id/rooms', rooms.getHouseVacant);
  app.use('/api/v1', router);
};
