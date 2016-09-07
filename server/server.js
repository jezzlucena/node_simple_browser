var express = require('express'),
    bodyParser = require('body-parser'),
    file_system = require('./routes/file_system');

var app = express();

app.use(bodyParser.json());

app.get('/read_dir', function(req, res){
  file_system.getFiles(req.query.sourcepath, req, res);
});
app.use(express.static(__dirname + '/views'));

app.listen(3000);
console.log('Listening on port 3000...');
