
const mongoose = require('mongoose');

const adminUserslist = new mongoose.Schema ( {
    ID: {
        type:String
    },
    name: {
        type:String
    },
    Email: {
        type:String
    }
});

const AdminUserslist = mongoose.model('AdminUsersList',adminUserslist);
module.exports = AdminUserslist;