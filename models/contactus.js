const mongoose = require ('mongoose');

const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    lastname : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
    phone : {
        type: Number,
        required : true,
    },
    message : {
        type: String,
        required : true,
    },
})

const contactData = mongoose.model('UserContactData', contactSchema);
module.exports = contactData;