const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    matiere: {
        type: String,
        required: true
    },
    couleur: {
        type: String,
        required: true
    },
    consommation: {
        type: Number,
        required: true
    },
    temps_de_production: {
        type: Number,
        required: true
    },
    pu_achat: {
        type: Number,
        required: true
    },
    confection: {
        type: Number,
        required: true
    },
    autre: {
        type: Number,
        required: true
    },
    cout_de_revient: {
        type: Number
    },
    pvht_plus_v: {
        type: Number
    },
    pvht_plus_s: {
        type: Number
    },
    tva: {
        type: Number
    },
    fodec: {
        type: Number
    },
    pv_htva: {
        type: Number
    },
    pv_ttc1: {
        type: Number
    },
    marge: {
        type: Number
    },
    pv_ht_revendeur_ac: {
        type: Number
    },
    pv_ht_gros: {
        type: Number
    },
    pv_ht_detail_site: {
        type: Number
    },
    ttc: {
        type: Number
    },
    pv_ttc2: {
        type: Number
    },
    pv_ht: {
        type: Number
    },
    revendeur_moins_d: {
        type: Number
    },
    pv_rht: {
        type: Number
    },
})

const Product = mongoose.model("product", ProductSchema);

module.exports = Product