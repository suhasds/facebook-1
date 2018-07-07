const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  show: function(req, res) {
    res.render("signup");
  },
  store: function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let confirmation = req.body.confirmation;
    
    //Todo: Validation
    //email format, unique
    //password min 6 chars, not have spaces, not empty, must match confirmation.

    User.create(
      { email: email, password: bcrypt.hashSync(req.body.password, 10) },
      function(err, user) {
        res.json(user);
      }
    );
  }
};
