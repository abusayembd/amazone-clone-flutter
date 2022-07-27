const mongoose = require('mongoose');
const productSchema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        trim: true,
    },
    descriptiom: {
        required: true,
        type: String,
        trim: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    quantity: {
        required: true,
        type: Number,
    },
    price: {
        required: true,
        type: Number,},
    category: {
        required: true,
        type: String,},
    
        //retings

});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;