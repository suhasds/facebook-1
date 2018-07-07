let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let session = require("express-session");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let crypto = require("crypto");
let connect_mongo = require("connect-mongo");
let MongoDBStore = connect_mongo(session);
let User = require("./models/User");
let bcrypt = require("bcrypt");

//DB connect
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 27017;
const ONE_WEEK = 60 * 24 * 7 * 60 * 1000;

mongoose.connect(
  `mongodb://${HOST}:${PORT}/facebook`,
  function(err) {
    if (!err) {
      console.log("Successfully connected to DB");
    }
  }
);

//Routes Initialized
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let authRouter = require("./routes/auth");
let signupRouter = require("./routes/signup");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: crypto.randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: false,
    maxAge: ONE_WEEK,
    cookie: {
      secure: false
    },
    store: new MongoDBStore({
      mongooseConnection: mongoose.connection,
      collection: "sessions"
    })
  })
);

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

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Using Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/signup", signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
