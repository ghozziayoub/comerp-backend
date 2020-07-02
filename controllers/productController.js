const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');

const Product = require('./../models/product');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome to product controller");
})

app.get('/all', (req, res) => {
    Product.find()
        .then((products) => {
            res.status(200).send(products);
        })
        .catch((e) => { res.status(400).send(e); })

})

app.get('/one/:id', (req, res) => {
    let id = req.params.id;

    Product.findOne({ _id: id })
        .then((product) => {
            res.status(200).send(product);
        })
        .catch((e) => { res.status(400).send(e); })

})

app.post('/add', (req, res) => {

    let data = req.body;

    let product = new Product({
        reference: data.reference,
        date: data.date,
        client: data.client,
        article: data.article,
        matiere: data.matiere,
        couleur: data.couleur,
        consommation: data.consommation,
        temps_de_production: data.temps_de_production,
        pu_achat: data.pu_achat,
        confection: data.confection,
        autre: data.autre
    });

    product.cout_de_revient = Number.parseFloat((product.consommation * product.pu_achat * 1.05) + product.confection + product.autre).toFixed(3);
    product.pvht_plus_v = Number.parseFloat((product.cout_de_revient / 1.19) / 0.8).toFixed(1);
    product.pvht_plus_s = Number.parseFloat((product.cout_de_revient / 1.19) * 1.2).toFixed(1);
    product.fodec = product.pvht_plus_s * 0.01
    product.tva = Number.parseFloat((product.pvht_plus_s + product.fodec) * 0.19).toFixed(3);
    product.pv_htva = product.pvht_plus_s + product.fodec
    product.pv_ttc1 = product.pvht_plus_s + product.fodec + product.tva

    product.marge = Number.parseFloat((((product.pvht_plus_s * 1.19) - product.cout_de_revient) / product.cout_de_revient) * 100).toFixed(0);
    product.pv_ht_revendeur_ac = product.pvht_plus_s
    product.pv_ht_gros = Number.parseFloat(product.pvht_plus_s * 1.08).toFixed(1);
    product.pv_ht_detail_site = Math.ceil(product.pvht_plus_s * 1.2 * Math.pow(10, 1)) / Math.pow(10, 1)
    product.ttc = 1.19 * product.pv_ht_detail_site
    product.pv_ttc2 = (product.cout_de_revient / 0.7).toFixed(1);
    product.pv_ht = Math.ceil((product.pv_ttc2 / 1.19) * Math.pow(10, 1)) / Math.pow(10, 1)
    product.revendeur_moins_d = Math.ceil(product.pv_ttc2 * 0.9 * Math.pow(10, 1)) / Math.pow(10, 1)
    product.pv_rht = Math.ceil(product.revendeur_moins_d / 1.19 * Math.pow(10, 1)) / Math.pow(10, 1)

    product.save()
        .then((prod) => { res.status(200).send(prod); })
        .catch((e) => { res.status(400).send(e); })

})

module.exports = app;