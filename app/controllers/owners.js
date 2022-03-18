// controllers for owners CRUD operations
// import owners model
const Owner = require('../models/owners.js');
// import browser checker
const checker = require('./browser.js');
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
