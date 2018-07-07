let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');
let passport = require('passport');

router.get('/login',loginController.show);
router.post('/login',passport.authenticate('local',{
    successRedirect: "/users",
    failureRedirect: "/auth/login"
}));

module.exports = router;