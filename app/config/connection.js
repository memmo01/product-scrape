var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: ""
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

module.exports = connection;
