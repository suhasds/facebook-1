let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');

router.get('/login',loginController.show);
router.post('/login',loginController.store);

module.exports = router;