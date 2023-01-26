const client = require("./connection.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(3300, () => {
  console.log("Sever is now listening at port 3300");
});

client.connect();
console.log("start");
app.get("/users", (req, res) => {
  console.log("getting...");
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/users", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into users( firstname, lastname, location) 
                       values('${user.firstname}', '${user.lastname}', '${user.location}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
});

app.get("/users/:id", (req, res) => {
  client.query(
    `Select * from users where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
});

app.put("/users/:id", (req, res) => {
  let user = req.body;
  let updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${req.params.id}`;
  console.log(updateQuery);
  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
});
app.delete("/users/:id", (req, res) => {
  let insertQuery = `delete from users where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
});
// client.connect();
client.end;
