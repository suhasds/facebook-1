var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require('passport');
var crypto = require("crypto");
var connect_mongo = require("connect-mongo");
var MongoDBStore = connect_mongo(session);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 27017;
const ONE_WEEK = 60*24*7*60*1000;

mongoose.connect(
  `mongodb://${HOST}:${PORT}/facebook`,
  function(err) {
    if (!err) {
      console.log("Successfully connected to DB");
    }
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var signupRouter = require("./routes/signup");

var app = express();

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
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
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
app.use(passport.initialize());
app.use(passport.session());

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
