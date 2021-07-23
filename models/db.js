const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://mongoadm:AI9zpiVGKYVHS5zi@cluster0.7momj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./boletim.model');