
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    obj = {
        name: "asfand",
        rollno: 34
    }
    res.json(obj)
})

module.exports = router