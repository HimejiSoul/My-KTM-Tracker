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
    console.log("Run on http://localhost:3000");
    console.log("connected");
  }  
});

app.get('/history', function(req, res){
  db.query('SELECT * FROM history ORDER BY time DESC', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);
        }

  });
});

app.get('/data', function(req, res){
  db.query('SELECT * FROM data', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }

  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM data WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password.' });
    } else {

      res.json({ message: 'Login successful' });
    }
  });
});
