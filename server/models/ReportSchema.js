

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema ( {
    ID: {
        type:String
    },
    Category: {
        type:String
    },
    Report: {
        type:String
    }
});

const ReportData = mongoose.model('Report',reportSchema);
module.exports = ReportData;