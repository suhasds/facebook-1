let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');
let passport = require('passport');

router.get('/login',loginController.show);
router.post('/login',function (req, res, next) {
    console.log(req.body);
    next();
}, passport.authenticate('local',{
    successRedirect: "/users",
    failureRedirect: "/auth/login"
}));

module.exports = router;