const express = require('express');
const router = express.Router();

const tradeController = require('../controllers/tradeController');

//get sent trade
router.get('/sent/:id', tradeController.get_sent_trade);

//get received trade
router.get('/received/:id', tradeController.get_receieved_trade);

//send trade
router.post('/offer', tradeController.send_trade);

//get one trade
router.get('/:id', tradeController.get_one_trade);

//update trade

//delete trade (prob not)

module.exports = router;