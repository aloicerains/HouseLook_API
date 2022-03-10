// Model for users
// create database connection
const sql = require('./db.js');
// user constructor
const User = function (user) {
  this.name = user.name;
  this.contact = user.contact;
};
// create new user
User.create = (newUser, result) => {
  const query = 'INSERT INTO `users` SET ?';
  sql.query(query, newUser, (err, res) => {
    if (err) {
      console.log('error :', err);
      result(err, null);
      return;
    }
    console.log('New user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertid, ...newUser });
  });
};
// get all users
User.findAll = result => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(null, err);
      return;
    }
    console.log('Success: ', res);
    result(null, res);
  });
};
// get user by id
User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log('User: ', res[0]);
      result(null, res[0]);
      return;
    }
    // id not found
    result({ kind: 'not_found' }, null);
  });
};
// Update user by id
User.update = (id, newUser, result) => {
  const query = 'UPDATE `users` SET ? WHERE id = ?';
  sql.query(query, [newUser, id], (err, res) => {
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
    console.log('User updated: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
// delete a user
User.delete = (id, result) => {
  sql.query(`DELETE FROM users WHERE id=${id}`, (err, res) => {
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
    console.log('Deleted user id: ', id);
    result(null, res);
  });
};
module.exports = User;
