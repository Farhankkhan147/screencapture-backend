const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://192.168.0.74:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// for dropping the database and creating it again.
// db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });

// for altering the database and migrating it.
// db.sequelize.sync({ alter: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });



// simple route
app.get("/", (res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/users.routes")(app);
require("./app/routes/tasks.routes")(app);
require("./app/routes/sites.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Yeah! Server is running on port :- ${PORT}.`);
});
