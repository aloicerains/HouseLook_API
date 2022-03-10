// Users Router Definition
module.exports = app => {
  // import user controllers
  const users = require('../controllers/users.js');
  // Create router
  const router = require('express').Router();
  // create user
  router.post('/users', users.create);
  // get all users
  router.get('/users', users.getAll);
  // get single user of given id
  router.get('/users/:id', users.getById);
  // update a user of specific id
  router.put('/users/:id', users.update);
  // delete user of given id
  router.delete('/users/:id', users.delete);
  // default usage
  app.use('/api/v1', router);
};
