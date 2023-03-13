// const mongoose = require("mongoose");


// const reportSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     Email: {
//         type: String,
//     },
//     Subject: {
//         type: String,

// },  
//     Message: {
//         type: String,

// },   
//     Date:{
//         type: Date,
//         default:Date.now
//     },
    

// })



// const Report = mongoose.model('Report', reportSchema);
// module.exports = Report;

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema ( {
    ID: {
        type:String
    },
    Category: {
        type:String
    },
    Feedback: {
        type:String
    }
});

const ReportData = mongoose.model('Report',reportSchema);
module.exports = ReportData;