const express = require('express');
const candyController = require('../controller/candy')
const router = express.Router();

router.post('/candyShop', candyController.postCandy);
router.get('/candyShop', candyController.getCandy);

router.put('/candyShop/:id', candyController.updateCandy);

module.exports = router;