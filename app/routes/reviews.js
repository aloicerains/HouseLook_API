// Reviews route definition
module.exports = app => {
  // import review controllers
  const reviews = require('../controllers/reviews.js');
  // import routes
  const router = require('express').Router();
  // get reviews route
  router.get('/reviews', reviews.getAll);
  // post a review
  router.post('/reviews', reviews.create);
  // get a specific review by id
  router.get('/reviews/:id', reviews.getById);
  // update a specific review
  router.put('/reviews/:id', reviews.update);
  // delete a review
  router.delete('/reviews/:id', reviews.delete);
  // get reviews in a house
  router.get('/houses/:id/reviews', reviews.getHouseReviews);
  // get reviews of a room
  router.get('/rooms/:id/reviews', reviews.getRoomReviews);
  // default path
  app.use('/api/v1', router);
};
