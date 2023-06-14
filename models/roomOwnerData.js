const mongoose = require ('mongoose');
const roomOwner = new mongoose.Schema({
    address:{
        type : String,
        required : true,
    },
    city:{
        type: String,
        required : true,
    },
    rent:{
        type: Number,
        required : true,
    },
    phone:{
        type: Number,
        required : true,
    },
    roomImage:{
        type : String,
        required: true,
    }
})

const roomOwnerData = mongoose.model('room_owner_Data', roomOwner);
module.exports = roomOwnerData;