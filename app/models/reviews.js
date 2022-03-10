// Reviews model
// require sql connection
const sql = require('./db.js');
// create Reviews constructor
const Review = function (review) {
  this.house_id = review.house_id;
  this.room_id = review.room_id;
  this.user_id = review.user_id;
  this.description = review.description;
};
// Create a new review
Review.create = (newReview, result) => {
  const query = 'INSERT INTO `reviews` SET ?';
  sql.query(query, newReview, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    console.log('Review created: ', { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};
// geta all reviews
Review.findAll = result => {
  sql.query('SELECT * FROM reviews', (err, res) => {
    if (err) {
      console.log('error :', err);
      result(err, null);
      return;
    }
    console.log('Success: ', res);
    result(null, res);
  });
};
// get review of given id
Review.findById = (id, result) => {
  sql.query(`SELECT * FROM reviews WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Review: ', res);
      result(null, res);
      return;
    }
    // id not found
    result({ kind: 'not_found' });
  });
};
// update a review
Review.update = (id, newReview, result) => {
  const query = 'UPDATE `reviews` SET ? WHERE id = ?';
  sql.query(query, [newReview, id], (err, res) => {
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
    console.log('Review updated: ', { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};
// get reviews of a given house
Review.houseReview = (id, result) => {
  sql.query(`SELECT * FROM reviews WHERE house_id=${id}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Reviews: ', res);
        result(null, res);
        return;
      }
      // house id not found
      result({ kind: 'not_found' }, null);
    });
};
// get reviews of a room
Review.roomReview = (id, result) => {
  sql.query(`SELECT * FROM reviews WHERE room_id=${id}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('Reviews: ', res);
        result(null, res);
        return;
      }
      // room id not found
      result({ kind: 'not_found' }, null);
    });
};
// delete a review
Review.remove = (id, result) => {
  sql.query(`DELETE FROM reviews WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log('Error: ', res);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // room id not found
      console.log('Not found id ', id);
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted review successfully');
    result(null, res);
  });
};
// export review model
module.exports = Review;
