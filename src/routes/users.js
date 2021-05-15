const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.send(`user route is called from => ${req.hostname}`)
})

module.exports = router;