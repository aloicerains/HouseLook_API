// House model definition
const sql = require('./db.js');
// House constructor
const House = function (house) {
  this.place_id = house.place_id;
  this.name = house.name;
  this.vacancy = house.vacancy || true;
  this.latitude = house.latitude || 0.001;
  this.longitude = house.longitude || 0.01;
};
// Create New House
House.create = (newHouse, result) => {
  sql.query('INSERT INTO houses SET ?', newHouse, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('Created new house: ', { id: res.insertId, ...newHouse });
    result(null, { id: res.insertId, ...newHouse });
  });
};
// Get houses in a given place
House.placeHouses = (id, result) => {
  sql.query(`SELECT * FROM houses WHERE place_id = ${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    // place id not found
    result({ kind: 'not_found' }, null);
  });
};
// Get vacant houses in a given place
House.placeVacantHouses = (id, result) => {
  sql.query(`SELECT * FROM houses WHERE place_id=${id} and vacancy=1`,
    (err, res) => {
      if (err) {
        console.log('Error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Vacant houses: ', res);
        result(null, res);
        return;
      }
      // place id not found
      result({ kind: 'not_found' }, null);
    });
};

// Get house by id
House.findById = (id, result) => {
  sql.query(`SELECT * FROM houses WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('Found house: ', res[0]);
      result(null, res[0]);
      return;
    }
    // house not found
    result({ kind: 'not_found' }, null);
  });
};
// Find vacant houses
House.findVacant = (result) => {
  sql.query('SELECT * FROM houses WHERE vacancy=true',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      console.log('Vacant houses: ', res);
      result(null, res);
    });
};
// Find all houses
House.findAll = result => {
  sql.query('SELECT * FROM houses', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('Houses: ', res);
    result(null, res);
  });
};
// Update house by id, you must update all variables
House.updateById = (id, house, result) => {
  const query = 'UPDATE `houses` SET ? WHERE id = ?';
  sql.query(query, [house, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows === 0) {
        // house not found
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('Updated house: ', { id: id, ...house });
      result(null, { id: id, ...house });
    });
};
// delete a house
House.remove = (id, result) => {
  sql.query(`DELETE FROM houses WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // house not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Delete house of id: ', id);
    result(null, res);
  });
};
// delete all houses
House.removeAll = result => {
  sql.query('DELETE FROM houses', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} houses`);
    result(null, res);
  });
};
module.exports = House;
