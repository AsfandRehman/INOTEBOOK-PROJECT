
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { query, validationResult, body } = require('express-validator');

// router.post('/', query('name').notEmpty().withMessage("name is empty please write a name") , (req, res)=> {
//     const result = validationResult(req.body);
//     res.send(result)
//     console.log(req.body)
//   });

// router.post('/', [body('email').notEmpty().withMessage("email is empty please write a valid email"),
//     body('password').isLength({ min:3,max:10}).withMessage("password must have a length of 3-10").notEmpty().withMessage("password is empty please write a valid password")
// ] , (req, res)=> {
//     const result = validationResult(req);
//     res.send(result)
//   });

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
          return res.status(400).json({ error: "sorry a user with this email already exists" });
        }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json(user)
    }
      catch(error) {
        console.error(error.message)
       res.status(500).send('some error occured')}

  });

module.exports = router