const express = require('express')
const { readFile } = require('fs')
const { connect } = require('http2')
const { connection } = require('mongoose')
const app = express()
const port = 25002
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1021323340096471082/8q7T0KvytjoSM2IHYnSU8bVj1MxrjvRoAx_3klahN2h8uH4V1ctqZqPRhA8F76lhFBin");
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: '65.108.15.66',
    user: 'u90_2n3WDdYx1l',
    password: 'z+R=D99h^ud!=Bzrov7d5e2F',
    database: 's90_visitors'
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
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
  var sql = "INSERT INTO datovisits (dato, tall) VALUES ( NOW(), 'first')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    });
})

app.get('/info', async function(req,res){
connection.connect(function(err) {
  connection.query("SELECT * FROM visits", function (err, result, fields) {
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
  connection.query("SELECT COUNT(*) AS TEST FROM datovisits WHERE dato BETWEEN '" + tid1 + "' AND '" + tid2 + "'", function (err, result, fields) {
    console.log(result[0])
    if (err) throw err;
    res.send(result[0])
  });
});

app.get('/formapi', function(req, res){
  console.log('email: ' + req.query.email)
  console.log('fedback: ' + req.query.feedback)
  var email = req.query.email
  var feedback = req.query.feedback

  const embed = new MessageBuilder()
  .setTitle('Nettside Fedback')
  .setAuthor( email, 'https://cdn.discordapp.com/embed/avatars/0.png', 'http://65.108.15.66:25002/')
  .setURL('http://65.108.15.66:25002/')
  .addField('Inhold:', feedback, true)
  .setColor('#00b0f4')
  .setThumbnail('https://cdn.discordapp.com/attachments/1021323293732651009/1045293651816894504/4kantLogo.png')
  .setTimestamp();
  
  hook.send(embed);

  connection.query("INSERT INTO feedback (dato, email, feedback) VALUES ( NOW(), '" + email + "', '" + feedback + "')", function (err, result, fields) {
    if (err) throw err;
    res.sendStatus(200)
  });
});
app.get('/coments', function(req, res){
  conection.query("SELECT * FROM feedback ORDER BY dato DESC limit 4;", function (err, result, fields) {
    if (err) throw err;
    res.status(200).json(result)
    console.log("Comments featched")
  });
});

app.get('/download/:filename', function(req, res){

    const filepath = __dirname + '/public/assets/' + req.params.filename;
    res.download(filepath, "Bruker_veiledningNettverk.pdf");
    (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            res.send('Error');
        } else {
            console.log('Sent:', filepath);
        }
    };
});




app.listen(port, () => {
  console.log(`About me app listening on port ${port}`)
})

app.use(express.static('public'))