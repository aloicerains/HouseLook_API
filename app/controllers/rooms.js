// Rooms controllers for CRUD operations
const Room = require('../models/rooms.js');
// create a new room
exports.create = (req, res) => {
  // Error handling
  if (!req.body.house_id || !req.body.place_id || isNaN(req.body.house_id) ||
    isNaN(req.body.place_id)) {
    res.status(400).send({});
    return;
  }
  // create a new room
  const room = new Room(req.body);
  // save the room in database
  Room.create(room, (err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(201).send(data);
  });
};
// Get all rooms
exports.getAll = (req, res) => {
  Room.findAll((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all vacant rooms
exports.getAllVacant = (req, res) => {
  Room.findAllVacant((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get room by id
exports.getById = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Update room of given id
exports.update = (req, res) => {
  // Error handling
  if (!req.body.house_id || !req.body.place_id || isNaN(req.body.house_id) ||
    isNaN(req.body.place_id)) {
    res.status(400).send({});
    return;
  }
  Room.update(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all single rooms
exports.getAllSingles = (req, res) => {
  Room.findAllSingles((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all bed sitters
exports.getAllSitters = (req, res) => {
  Room.findAllSitters((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all one bedrooms
exports.getAllOnebeds = (req, res) => {
  Room.findAllOnebeds((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all two bedrooms
exports.getAllTwobeds = (req, res) => {
  Room.findAllTwobeds((err, data) => {
    if (err) {
      res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all rooms in a place
exports.getPlaceRooms = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.placeRooms(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all vacant rooms in place
exports.getPlaceVacant = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.placeVacant(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all vacant rooms in a house
exports.getHouseVacant = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.houseVacant(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get ll single rooms in a place
exports.getSingle = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.findSingle(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all bedsitters in a place
exports.getSitter = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.findSitter(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all one bedrooms in a place
exports.getOnebed = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.findOnebed(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Get all two bedrooms in a place
exports.getTwobed = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.findTwobed(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send(data);
  });
};
// Delete a single room
exports.delete = (req, res) => {
  // Error handling
  if (isNaN(req.params.id)) {
    res.status(400).send({});
    return;
  }
  Room.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({});
      } else res.status(500).send({});
    } else res.status(200).send('Deleted');
  });
};
