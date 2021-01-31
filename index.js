const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is up and running on port ${port}`)
})