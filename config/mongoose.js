const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/ekzero`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the databse"));

db.once('open', function(){
    console.log('connected to the database');
})


module.exports = db;