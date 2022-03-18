// Review controllers for the CRUD Operations
const Review = require('../models/reviews.js');
// import browser checker
const checker = require('./browser.js');
// create a new review
exports.create = (req, res) => {
  // Error handling
  if (!req.body.house_id || !req.body.room_id || !req.body.user_id ||
    isNaN(req.body.house_id) || isNaN(req.body.room_id) ||
    isNaN(req.body.user_id)) {
    res.status(400).send({});
    return;
  }
  const review = new Review(req.body);
  Review.create(review, (err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(201).send(data);
  });
};
// get all reviews
exports.getAll = (req, res) => {
  Review.findAll((err, data) => {
    if (err) {
      res.status(500).send({ Error: 'Internal Error' });
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
// get a specific review of given id
exports.getById = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Review.findById(req.params.id, (err, data) => {
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
// update a given review
exports.update = (req, res) => {
  // Error handling
  if (!req.body.house_id || !req.body.room_id || !req.body.user_id ||
    isNaN(req.body.house_id) || isNaN(req.body.room_id) ||
    isNaN(req.body.user_id)) {
    res.status(400).send({});
    return;
  }
  Review.update(req.params.id, req.body, (err, data) => {
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
// get reviews of a given house
exports.getHouseReviews = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Review.houseReview(req.params.id, (err, data) => {
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
// get reviews of given room
exports.getRoomReviews = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Review.roomReview(req.params.id, (err, data) => {
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
// delete a review
exports.delete = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Review.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send('Deleted');
  });
};
