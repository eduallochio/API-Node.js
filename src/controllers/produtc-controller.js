'use strict';


const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const Product = mongoose.model('Product');


exports.post = (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título de conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).and();
        return;
    }


    var product = new Product(req.bady);
    product
    .save()
    .then(x => {
        res.status(201).sand({
            message: 'Produto cadastrado com sucesso!'
        });

    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar o produto',
            data: e 
        })
    })

};


exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};
exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
};