const mongoose = require('mongoose');

var boletimSchema = new mongoose.Schema({
    mike: {
        type: String,
        required: 'This field is required.'
    },
    
    responsavel: {
        type: String
    },

    gt: {
        type: String
    },

    efetivo: {
        type: String
    },

    matricula: {
        type: String
    },

    tipoOcorr: {
        type: String
    },

    createdAt: {
        type: String
    },
    dataFato: {
        type: String
    },



    
    

});

// Custom validation for email


mongoose.model('boletim', boletimSchema);