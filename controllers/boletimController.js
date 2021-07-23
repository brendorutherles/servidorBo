const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const boletim = mongoose.model('boletim');

router.get('/', (req, res) => {
    res.render("boletim/addOrEdit", {
        viewTitle: "Adicionar BO"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var boletim = new boletim();
    boletim.mike = req.body.mike;
    boletim.responsavel = req.body.responsavel;
    boletim.efetivo = req.body.efetivo;
    boletim.gt = req.body.gt;
    boletim.matricula = req.body.matricula;
    boletim.tipoOcorr = req.body.tipoOcorr;
    boletim.createdAt = req.body.createdAt;
    boletim.dataFato = req.body.dataFato;

    
    boletim.save((err, doc) => {
        if (!err)
            res.redirect('boletim/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("boletim/addOrEdit", {
                    viewTitle: "Insert boletim",
                    boletim: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    boletim.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('boletim/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("boletim/addOrEdit", {
                    viewTitle: 'Update boletim',
                    boletim: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    boletim.find((err, docs) => {
        if (!err) {
            res.render("boletim/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving boletim list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    boletim.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("boletim/addOrEdit", {
                viewTitle: "Update boletim",
                boletim: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    boletim.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/boletim/list');
        }
        else { console.log('Error in boletim delete :' + err); }
    });
});

module.exports = router;