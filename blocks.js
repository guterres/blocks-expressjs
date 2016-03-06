var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //npm install body-parser
var parseUrlencoded = bodyParser.urlencoded({ extended: false }); //forces the use of the native querystring Node library

app.use(express.static('public'));

var blocos = {
  'Fixed':'Fastened securely in position',
  'Movable':'Capable of being moved',
  'Rotating':'Moving in a circle around its center'
};

app.param('name', function(request, response, next){ //called for routes which include the :name placeholder
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase(); //first character to upper case and remaining characters to lowercase.

  request.blockName = block; //can be accessed from other routes in the application
  next(); //must be called to resume request
});

app.route('/blocks') //dynamic route instance
  .get(function(request, response){
    if(request.query.limit >= 0){ //true when a numeric value for limit is part of the URL
      response.json(Object.keys(blocos).slice(0, request.query.limit));
    }else{
      response.json(Object.keys(blocos)); //returns all results
    }
  })

  .post(parseUrlencoded, function(request, response){
    var newBlock = request.body; //returns form data
    blocos[newBlock.name] = newBlock.description; //adds new block to the blocks Object

    response.status(201).json(newBlock.name); //responds with new block name with sets the 201 created status code
  });

app.route('/blocks/:name')
  .get(function(request, response){
    var description = blocos[request.blockName];
    if(description){
      response.json(description);
    }else{
      response.status(404).json('No description found for '+request.params.name);
    }
  })
  .delete(function(request, response){
    if(blocos[request.blockName]){
      delete blocos[request.blockName];
      response.sendStatus(200);
    }else{
      response.sendStatus(404);
    }

  });

app.listen(3000);
