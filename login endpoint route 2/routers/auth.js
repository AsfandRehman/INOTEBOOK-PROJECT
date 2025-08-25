
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, validationResult, body } = require('express-validator');

const jwt_Secret = "asfand4321";

router.post('/', [body('email').isEmail(),
  body('name', 'more than 3 characters').isLength({ min:3,max:10}),
  body('password').isLength({ min:3 })
] , async (req, res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try{
      let user = await User.findOne({email: req.body.email})
      if(user) {
        return res.status(400).json({ error: "please try to login with correct credentials" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
       id: user.id
    }
    const token = jwt.sign(data, jwt_Secret);
    res.json({token})
  }
    catch(error) {
      console.error(error.message)
     res.status(500).send('some error occured')}

});

router.post('/login', [body('email').isEmail(),
  body('password').exists()
] , async (req, res)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const {email, password} = req.body;
    try{
      let user = await User.findOne({email})
      if(!user) {
        return res.status(400).json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if(!passwordCompare) {
        return res.status(400).json({ error: "please try to login with correct credentials" });
      }
      const data = {
        id: user.id
     }
     const token = jwt.sign(data, jwt_Secret);
     res.json({token})
    }
    catch (error) {
      console.error(error.message)
     res.status(500).send('some error occured')
    }
})

module.exports = router