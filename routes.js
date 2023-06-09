var express = require('express');
var app = express();
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors');
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'rfidadmin',
  password: 'rfidadmin',
  database: 'rfid',
  timezone: 'Asia/Jakarta'

});

var server = app.listen(3000, function () {
  console.log("start");

});

db.connect(function (error) {
  if (error) console.log(error);
  else {
    console.log("Run on http://localhost:3000/history");
    console.log("connected");
  }
});

let globalUid, globalusername;

app.get('/history', function (req, res) {

  db.query('SELECT * FROM history WHERE uid=? ORDER BY time DESC', [globalUid], function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.get('/users', function (req, res) {
  db.query('SELECT * FROM users', function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password.' });
    } else {
      const user = results[0];
      const { nim, nama, uid, username, status } = user;
      const insertQuery = `UPDATE sessions SET nim = '${nim}', nama = '${nama}',uid = '${uid}',username = '${username}', status = '${status}' WHERE id = 1`;

      db.query(insertQuery, (insertErr) => {
        if (insertErr) {
          console.error('Error storing session data in MySQL:', insertErr);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        } else {
          console.log(nama, nim, uid, username, status);
          globalUid = uid;
          globalusername = username;
          res.json({ message: 'Login successful' });
        }
      });
    }
  });
});


app.get('/sessions', function (req, res) {
  db.query('SELECT * FROM sessions WHERE id = 1', function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});

app.post('/block', (req, res) => {

  const query = `UPDATE users SET status = 'deny' WHERE username = '${globalusername}'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error updating user status:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User status updated successfully' });
    console.log('User status updated successfully');
  });
});