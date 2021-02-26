
const express = require('express');
var router = express.Router();
const sequelize = require('./../database/database');
const User = require('./../models/model');
const bcrypt = require('bcrypt');


sequelize.sync();


router.get('/testdre', (req, res) => {
  return User.findAll().then((user) => {
    if (user) {
      res.send(user);
    }
    else {
      res.status(400).send("Error in fectch data");
    }
  });
});


router.post('/signup', (req, res) => {
  return User.findOne({ where: { email: req.body.email } }).then((result) => {
    if (result) {
      res.status(400).send("Email already exist");
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (hash) {
          return User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash

          }).then((user) => {
            if (user) {
              res.send(user);
            }
            else {
              res.status(400).send("Error in inserted");
            }
          });
        }
        else {
          console.log(err);
        }
      });
    }
  });
});
  router.get('/', (req, res) => {
    return User.findAll().then((user) => {
      if (user) {
        res.send(user);
      }
      else {
        res.status(400).send("Error in fectch data");
      }
    });
  });

  router.delete('/:id', (req, res) => {
    return User.destroy({ where: { id: req.params.id } }).then((deleted) => {
      if (deleted === 1) {
        res.send("deleted successfully");
      }
    }).catch((err) => { res.send(err); });
  });

  router.put('/:id', (req, res) => {
    return User.update({ name: req.body.name, email: req.body.email }, { where: { id: req.params.id } }).then((result) => {
      if (result) {
        return User.findOne({ where: { id: req.params.id } }).then((data) => {
          if (data) {
            res.send(data);
          }
        }).catch(err => { res.send(err); });

      }
    }).catch((err) => { res.send(err) });
  });


  module.exports = router;