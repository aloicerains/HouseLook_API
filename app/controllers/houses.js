// House Controllers for CRUD operations
const House = require('../models/houses.js');
// create a new house
exports.create = (req, res) => {
  // Error handling
  if (!req.body.place_id || !req.body.name || isNaN(req.body.place_id)) {
    res.status(400).send({});
    return;
  }
  // create new house
  const house = new House(req.body);
  // save house in the database
  House.create(house, (err, data) => {
    if (err) { res.status(500).send({}); } else res.status(201).send(data);
  });
};
// Retrive all houses in a given place id
exports.placeHouses = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  // retrieve houses
  House.placeHouses(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else res.status(200).send(data);
  });
};
// Retrieve all vacant houses in given place
exports.placeVacancies = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  House.placeVacantHouses(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else res.status(200).send(data);
  });
};
// Retrieving all houses
exports.findAll = (req, res) => {
  House.findAll((err, data) => {
    if (err) { res.status(500).send({}); } else res.status(200).send(data);
  });
};
// Retrieve a singele house of given id
exports.findOne = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  // retrieve houses
  House.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Retrive all vacant houses
exports.findVacancy = (req, res) => {
  House.findVacant((err, data) => {
    if (err) { res.status(500).send({}); } else res.status(200).send(data);
  });
};
// Update a house given an id
exports.update = (req, res) => {
  // error handling
  if (!req.body.place_id || !req.body.name || isNaN(req.body.place_id) ||
    isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  console.log(req.body);
  House.updateById(req.params.id, new House(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({});
        } else res.status(500).send({});
      } else res.status(200).send(data);
    });
};
// Delete a single house given an id
exports.delete = (req, res) => {
  // Request Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  House.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else res.status(200).send('Deleted');
  });
};
// Delete all houses
exports.deleteAll = (req, res) => {
  House.removeAll((err, data) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send('All houses deleted');
    }
  });
};
