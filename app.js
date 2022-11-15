// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
// require('./config/session.config.js')(app);
const sessionConfig = require('./config/session.config.js');
sessionConfig(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "roles";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
  // if (req.session.user) {
  //   app.locals.userNav = true;
  // } else {
  //   app.locals.userNav = false;
  // }
  // req.session.user ? app.locals.userNav = true : app.locals.userNav = false
  // app.locals.userNav = req.session.user ? true : false;
  app.locals.userNav = !!req.session.user // {} --> !{} --> !false --> true
  console.log(app.locals.userNav);
  next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

// app.use('/auth', require('./routes/auth.routes'));
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

app.use('/user', require('./routes/user.routes'));

app.use('/celebrities', require('./routes/celebrity.routes'))

app.use('/movie', require('./routes/movie.routes'));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
