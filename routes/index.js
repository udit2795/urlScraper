const router = require('express').Router();

const controller = require('../controller/controller');


router.post('/fetchMeta', controller.getMeta);

module.exports = router;
