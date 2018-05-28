
var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Chirp = sequelize.define("chirp", {
    author: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE
    }
}, {
        timestamps: false

    });

var Replypost = sequelize.define("reply", {

    postId: {
        type: Sequelize.INTEGER
    },
    replyBody: {
        type: Sequelize.STRING
    },
    created_ar: {
        type:Sequelize.DATE
    }   
}, {
    timestamps: false
})

Chirp.sync();
Replypost.sync();

module.exports = Chirp;
module.exports = Replypost;