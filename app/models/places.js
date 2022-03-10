// Defines place model
const sql = require('./db.js');

// place constructor
const Place = function (place) {
  this.name = place.name;
};
// new place
Place.create = (newPlace, result) => {
  sql.query('INSERT INTO places SET ?', newPlace, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created place: ', { id: res.insertId, ...newPlace });
    result(null, { id: res.insertId, ...newPlace });
  });
};
// find place by id
Place.findById = (id, result) => {
  sql.query(`SELECT * FROM places WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Found place: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found
    result({ kind: 'not_found' }, null);
  });
};
// find all places
Place.findAll = result => {
  sql.query('SELECT * FROM places', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('Available places: ', res);
    result(null, res);
  });
};
// update place by id
Place.updateById = (id, name, result) => {
  sql.query('UPDATE places SET name = ? WHERE id = ?', [name.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // Place not found
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('Updated place: ', { id: id, ...name });
      result(null, { id: id, ...name });
    });
};
// delete place
Place.remove = (id, result) => {
  sql.query(`DELETE FROM places WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // Place not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted Place of id: ', id);
    result(null, res);
  });
};
// delete all places
Place.removeAll = result => {
  sql.query('DELETE FROM places', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} places`);
    result(null, res);
  });
};
module.exports = Place;
