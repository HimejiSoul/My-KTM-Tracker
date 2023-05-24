var express = require('express');
var app  = express();
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

var db = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'rfidadmin',
  password:'rfidadmin',
  database: 'rfid',
  timezone: 'Asia/Jakarta'
  
});

var server = app.listen(3000, function(){
  console.log("start");
  
});

db.connect(function(error){
  if(error) console.log(error);
  else{
    console.log("Run on http://localhost:3000/history");
    console.log("connected");
  }  
});

let globalUid;

app.get('/history', function(req, res){
  
  
  db.query('SELECT * FROM history WHERE uid=? ORDER BY time DESC',[globalUid], function(error, rows, fields){
    if(error) console.log(error);
    
    else{
      console.log(globalUid);
      res.send(rows);
    }
  });
});

// app.get('/users', function(req, res){
//   db.query('SELECT * FROM users', function(error, rows, fields){
//         if(error) console.log(error);
//         else{
//             console.log(rows);
//             res.send(rows);
//         }
//   });
// });

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT nim, nama,uid FROM users WHERE username = '${username}' AND password = '${password}'`;

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
      const { nim, nama,uid } = user;

      const insertQuery = `UPDATE sessions SET nim = '${nim}', nama = '${nama}',uid = '${uid}' WHERE id = 1`;

      db.query(insertQuery, (insertErr) => {
        if (insertErr) {
          console.error('Error storing session data in MySQL:', insertErr);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        } else {
          console.log(nama,nim,uid);
          globalUid =uid;
          res.json({ message: 'Login successful' });
        }
      });
    }
  });
});


app.get('/sessions', function(req, res){
  db.query('SELECT nama,nim,uid FROM sessions WHERE id = 1', function(error, rows, fields){
        if(error) console.log(error);
        else{
          console.log(globalUid);
          res.send(rows);
        }
  });
});