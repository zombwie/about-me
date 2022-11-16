const express = require('express')
const { readFile } = require('fs')
const { connect } = require('http2')
const app = express()
const port = 25002
var mysql = require('mysql')

var conection = mysql.createConnection({
    host: '',
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
    console.log("Visitors updated");
  });
})

app.get('/info', async function(req,res){
conection.connect(function(err) {
  conection.query("SELECT * FROM visits", function (err, result, fields) {
  console.log(result);
  res.status(200).json({info: result})
    if (err) throw err;
   });
});  
})


app.listen(port, () => {
  console.log(`About me app listening on port ${port}`)
})

app.use(express.static('public'))
