// Owners model
// import db connection
const sql = require('./db.js');
// create Owners constructor
const Owner = function (newOwner) {
  this.house_id = newOwner.house_id;
  this.name = newOwner.name;
  this.contact = newOwner.contact;
};
// create new owner
Owner.create = (newOwner, result) => {
  const query = 'INSERT INTO `owners` SET ?';
  sql.query(query, newOwner, (err, res) => {
    if (err) {
      console.log('error :', err);
      result(err, null);
      return;
    }
    console.log('New owner: ', { id: res.insertId, ...newOwner });
    result(null, { id: res.insertid, ...newOwner });
  });
};
// get all owners
Owner.findAll = result => {
  sql.query('SELECT * FROM owners', (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(null, res);
      return;
    }
    console.log('Retrieved all owners');
    result(null, res);
  });
};
// get specific owner
Owner.findById = (id, result) => {
  sql.query(`SELECT * FROM owners WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('Retrieved owner: ', res[0]);
      result(null, res[0]);
      return;
    }
    // id not found
    result({ kind: 'not_found' }, null);
  });
};
// update owner information
Owner.update = (id, newOwner, result) => {
  const query = 'UPDATE `owners` SET ? WHERE id = ?';
  sql.query(query, [newOwner, id], (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Owner updated: ', { id: res.insertId, ...newOwner });
    result(null, { id: res.insertId, ...newOwner });
  });
};
// get owners of a house
Owner.houseOwner = (id, result) => {
  sql.query(`SELECT * FROM owners WHERE house_id=${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0 || !res.length) {
      // id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Retrieved house owner', res);
    result(null, res);
  });
};
// Delete owner
Owner.remove = (id, result) => {
  sql.query(`DELETE FROM owners WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // user id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted owner id: ', id);
    result(null, res);
  });
};
// Export owner
module.exports = Owner;
