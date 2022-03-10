// controllers for owners CRUD operations
// import owners model
const Owner = require('../models/owners.js');
// create a new owner
exports.create = (req, res) => {
  // Error handling
  if (!req.body.name || !req.body.house_id || isNaN(req.body.house_id)) {
    res.status(400).send({});
    return;
  }
  // create a new owner
  const owner = new Owner(req.body);
  // save the owner in database
  Owner.create(owner, (err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(201).send(data);
  });
};
// Get all owners
exports.getAll = (req, res) => {
  Owner.findAll((err, data) => {
    if (err) {
      res.status(500).send({});
    }
    res.status(200).send(data);
  });
};
// Get speicific owner
exports.getById = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Owner.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// update owner of given id
exports.update = (req, res) => {
  // Error handling
  if (!req.body.name || !req.body.house_id || isNaN(req.body.house_id)) {
    res.status(400).send({});
    return;
  }
  Owner.update(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get house owner
exports.getHouseOwner = (req, res) => {
  // Input error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Owner.houseOwner(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// delete a owner
exports.delete = (req, res) => {
  // input error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Owner.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send('Deleted');
  });
};
