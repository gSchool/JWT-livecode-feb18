var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    bodyParser = require("body-parser"),
    knex = require('../db/knex');

// Public assets directory
app.use('/client', express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// LOGIN
app.post('/api/login', function(req, res) {
    knex.select('*').from('users').where(req.body)
    .then(function(rows){
        if(rows.length === 1) {
            // We sign enough information to determine if 
            // the user is valid in the future. 
            // In our case, username and password are required
            var token = jwt.sign({ username: rows[0].username,
                               password: rows[0].password
                             }, "VERY SECRET");

            // On success, we send the token back
            // to the browser.
            res.json({jwt:token});
        }
        else {
            res.json({
                error: JSON.stringify(err),
                message: "no matching user/pass combo"
            });
        }
    }).catch(function(err){
        console.log(err);
        res.json({
            error: JSON.stringify(err),
            message: "Error connecting to Database"
        })
    });
});

// Authenticated Route, get the text of all posts
app.get('/api/posts', function(req, res) {
    // If they don't even have an authorization
    // header, they are not authenticated
    if(req.headers.authorization) {
        // unpack that auth header, which is "Bearer " + tokenData 
        var token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, "VERY SECRET");
        console.log(decoded);
        var usrData = {
            username: decoded.username,
            password: decoded.password
        }

        // If we successfully decoded, we still
        // need to check that the encoded data 
        // is a user of ours!
        knex('users').where(usrData).then(function(rows){
            // IF the user existed -- send the data!
            if(rows.length === 1) {
                knex('posts').then(function(rows) {
                    res.json(rows);
                });
            }
            // IF the decoded JWT wasn't a user in our DB
            else {
                res.json({
                    message: "JWT is not for a valid user"
                });
            }
        });        
    }
    // IF the user didn't have an authorization header
    else{
        res.json({message: "Unauthorized access, no authorization header"});
    }
});

// Always serve the angular app for routes that aren't registered above
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Server is listening on port " + port);
});