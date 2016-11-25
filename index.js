var express = require('express');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.get('/search', function(req, res) {
    console.log(req.query.url);
    
    request(req.query.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('found body');
            res.send(body);
        }
        else {
            console.log(error || response);
            res.send('error');    
        }
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


