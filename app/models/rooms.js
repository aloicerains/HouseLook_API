// Rooms model
// database connection
const sql = require('./db.js');
// rooms constructor
const Room = function (room) {
  this.house_id = room.house_id;
  this.place_id = room.place_id;
  this.name = room.name;
  this.vacancy = room.vacancy || 1;
  this.type = room.type || 'single';
  this.price = room.price;
  this.description = room.description;
};
// Create a new room
Room.create = (newRoom, result) => {
  const query = 'INSERT INTO `rooms` SET ?';
  sql.query(query, newRoom, (err, res) => {
    if (err) {
      console.log('error :', err);
      result(err, null);
      return;
    }
    console.log('New room: ', { id: res.insertId, ...newRoom });
    result(null, { id: res.insertid, ...newRoom });
  });
};
// Get all rooms
Room.findAll = result => {
  sql.query('SELECT * FROM rooms', (err, res) => {
    if (err) {
      console.log('error :', err);
      result(err, null);
      return;
    }
    console.log('Success: ', res);
    result(null, res);
  });
};
// Get all vacant rooms
Room.findAllVacant = result => {
  const query = 'SELECT * FROM `rooms` WHERE vacancy = true';
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('Vacant rooms: ', res);
    result(null, res);
  });
};
// Get room by id
Room.findById = (id, result) => {
  const query = `SELECT * FROM rooms WHERE id=${id}`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('Room: ', res[0]);
      result(null, res[0]);
      return;
    }
    // id not found
    result({ kind: 'not_found' }, null);
  });
};
// Update room of given id
Room.update = (id, newRoom, result) => {
  const query = 'UPDATE `rooms` SET ? WHERE id = ?';
  sql.query(query, [newRoom, id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows === 0) {
      // id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Room updated: ', { id: res.insertId, ...newRoom });
    result(null, { id: res.insertId, ...newRoom });
  });
};
// Get all single rooms
Room.findAllSingles = result => {
  sql.query("SELECT * FROM rooms WHERE type='single'", (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('Singles: ', res);
    result(null, res);
  });
};
// Get all bed sitters rooms
Room.findAllSitters = result => {
  sql.query("SELECT * FROM rooms WHERE type='sitter'", (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('Bed sitters: ', res);
    result(null, res);
  });
};
// Get all one bedrooms
Room.findAllOnebeds = result => {
  sql.query("SELECT * FROM rooms WHERE type='one'", (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('one bedrooms: ', res);
    result(null, res);
  });
};
// Get all two bedrooms
Room.findAllTwobeds = result => {
  sql.query("SELECT * FROM rooms WHERE type='two'", (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('Two bedrooms: ', res);
    result(null, res);
  });
};
// Get all rooms in a place
Room.placeRooms = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Houses: ', res);
      result(null, res);
      return;
    }
    // place id not found
    result({ kind: 'not_found' }, null);
  });
};
// Get all vacant rooms in a place
Room.placeVacant = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid} and vacancy=1`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Vacant rooms: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Get all vacant rooms in a house
Room.houseVacant = (hid, result) => {
  sql.query(`SELECT * FROM rooms WHERE house_id=${hid} and vacancy=1`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Vacant rooms: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Get all single rooms in a place
Room.findSingle = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid} and type='single'`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Vacant rooms: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Get all bed sitter rooms in a place
Room.findSitter = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid} and type='sitter'`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Bed sitters: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Get all one bedrooms in a place
Room.findOnebed = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid} and type='one'`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('One bedrooms: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Get all two bedrooms in a place
Room.findTwobed = (pid, result) => {
  sql.query(`SELECT * FROM rooms WHERE place_id=${pid} and type='two'`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Two bedrooms: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};
// Delete a room
Room.remove = (id, result) => {
  sql.query(`DELETE FROM rooms WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // room id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted room id: ', id);
    result(null, res);
  });
};
module.exports = Room;
