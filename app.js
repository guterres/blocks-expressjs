var express = require('express');
var app = express();

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks); //router is mounted in a particular root url

app.listen(3000, function(){
  console.log('Listening on 3000 \n');
});
