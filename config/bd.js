const mongoose = require('mongoose');
function connect(){
    mongoose.connect('mongodb://localhost:27017/base', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     
    
    }).then(() => console.log('database connection successful'))
     .catch((err) => console.error('database not connection successful', err));
    }
    module.exports = {
    connect: connect
    };