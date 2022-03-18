// Place controllers for the CRUD operations
const Place = require('../models/places.js');
// import browser checker
const checker = require('./browser.js');
// Create new place
exports.create = (req, res) => {
  // validate request
  if (!req.body.name) {
    res.status(400).send({});
    return;
  }
  // create place
  const place = new Place(req.body);
  // save in database
  Place.create(place, (err, data) => {
    if (err) { res.status(500).send({}); } else res.status(201).send(data);
  });
};
// Retrieve all places from database
exports.findAll = (req, res) => {
  Place.findAll((err, data) => {
    if (err) { res.status(500).send({}); } else {
      const dat = JSON.stringify(data, null, '\t');
      checker.browser(req, (error, result) => {
        if (error) { res.status(500).send({}); }
        if (result.kind === 'browser') {
          res.status(200).render('pages/index', { data: dat });
        } else res.status(200).send(dat);
      });
    }
  });
};
// Find a single place with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send({});
    return;
  }
  Place.findById(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else {
      // Formating json output
      const dat = JSON.stringify(data, null, '\t');
      checker.browser(req, (error, result) => {
        if (error) { res.status(500).send({}); }
        if (result.kind === 'browser') {
          res.status(200).render('pages/index', { data: dat });
        } else res.status(200).send(dat);
      });
    }
  });
};
// Update a place with an id
exports.update = (req, res) => {
  // error handling
  if (!req.body.name) {
    res.status(400).send({});
    return;
  }
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send();
    return;
  }
  Place.updateById(id, new Place(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else res.status(200).send(data);
  });
};
// delete a place with an id
exports.delete = (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send();
    return;
  }
  Place.remove(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else {
        res.status(500).send({});
      }
    } else res.status(200).send('Deleted');
  });
};
// delete all places from the database
exports.deleteAll = (req, res) => {
  Place.removeAll((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send('All Deleted');
  });
};
