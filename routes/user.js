
const express = require('express');
var router = express.Router();
const sequelize = require('./../database/database');
const User = require('./../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


sequelize.sync();


router.get('/test', (req, res) => {
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

  router.post('/login',async (req,res)=>{
    var userData =await  User.findOne({where:{email:req.body.email}});
    if(!userData){
       return res.status(400).send('Email not exist');
    }
    //console.log(userData);
    var validpass = await bcrypt.compare(req.body.password,userData.password);

    if(!validpass){
       return res.status(400).send("Password is not valid");
    }

    var token = await jwt.sign({email:userData.email},'Secret');

    res.header('auth',token).send(token);
  });

  const validUser = (req,res,next)=>{
    var jwttoken = req.header('auth');
    req.token = jwttoken;
    next()
  }

  router.get('/',validUser, (req, res) => {
    jwt.verify(req.token,'Secret',async(err,data)=>{
      if(err){
        res.sendStatus(403);
      }
      else{
         var getUserData =await User.findAll();
          if (getUserData) {
            res.send(getUserData);
          }
          else {
            res.status(400).send("Error in fectch data");
          }
      }
    })
   
  });

  module.exports = router;