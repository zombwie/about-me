const express = require('express')
const { readFile } = require('fs')
const { connect } = require('http2')
const { connection } = require('mongoose')
const app = express()
const port = 25002
var mysql = require('mysql')

var conection = mysql.createConnection({
    host: '...',
    user: '',
    password: '',
    database: ''
})
app.get('/', (req, res) => {
  readFile('public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }
    res.writeHead(200)
    res.end(data)
  })
  var sql = "UPDATE visits SET visitors = visitors + 1";
  conection.query(sql, function (err, result) {
    if (err) throw err;
  });
  var sql = "INSERT INTO datovisits (dato, tall) VALUES ( NOW(), 'first')";
  conection.query(sql, function (err, result) {
    if (err) throw err;
    });
})

app.get('/info', async function(req,res){
conection.connect(function(err) {
  conection.query("SELECT * FROM visits", function (err, result, fields) {
  console.log("Site has been visited " + result[0].visitors + " times");
  res.status(200).json({info: result})
    if (err) throw err;
   });
});  
})
app.get('/api', function(req, res){
  console.log('tid1: ' + req.query.tid1)
  console.log('tid2: ' + req.query.tid2)
  var tid1 = req.query.tid1
  var tid2 = req.query.tid2
  conection.query("SELECT COUNT(*) AS TEST FROM datovisits WHERE dato BETWEEN '" + tid1 + "' AND '" + tid2 + "'", function (err, result, fields) {
    console.log(result[0])
    if (err) throw err;
    res.send(result[0])
  });
});

app.listen(port, () => {
  console.log(`About me app listening on port ${port}`)
})

app.use(express.static('public'))