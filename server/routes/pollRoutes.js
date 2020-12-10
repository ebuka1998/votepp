const express = require('express')
const router = express.Router()

const {pollController} = require('../controllers/pollController')

router.post('/createPoll', pollController.createPoll)

router.get('/getPolls', pollController.getPolls)

router.get('/getPolls/:id', pollController.getPoll)

router.post('/votepoll/:id', pollController.votePoll)

module.exports = router