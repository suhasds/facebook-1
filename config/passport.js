let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let User = require("../models/User");
let bcrypt = require("bcrypt");

//Verify Callback for Passport
passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
          console.log("in verify callback");
          //done(err) server issue
          if (err) return done(err);
  
          //done(null,false) user does not exist
          if (!user) {
            return done(null, false, {
              message: "User does not exist"
            });
          }
  
          //done(null,user) if user exists and password is correct/wrong
          const isVerified = bcrypt.compareSync(password, user.password);
          if (isVerified) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Invalid email or password"
            });
          }
        });
      }
    )
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  module.exports = passport;