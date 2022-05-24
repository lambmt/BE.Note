const mongoose = require('mongoose');


//note schema

const Note = mongoose.model('Note', {
    note_title: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    note_content: {
        content: {
            type: String,
            require: false
        },
        image: {
            image_id: {
                type: Number,
                require: false
            },
            image_title: {
                type: String,
                require: false
            },
            image_url: {
                type: String,
                require: false
            },
            image_caption: {
                type: String,
                require: false
            }
        }
    }
});


module.exports = { Note }