const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordsSchema = new Schema (
    {
        record  : { type: String , required: true },
        artist : { type : String , required: true },
        year : { type : Number , required : true },
        style : { type : String , required : true },
        added : { type : Boolean , required : true },
        image : { type : String , required : true },
        date : { type : Date , default : Date.now() }
    },
    {
        timeStamps : true
    }
)

const Records = mongoose.model('Records' , recordsSchema);
module.exports = Records;