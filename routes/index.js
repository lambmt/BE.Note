const express = require('express');
const { model } = require('mongoose');
const router = express.Router();


const { Note } = require('../models/note');

//get all note
router.get('/api/get_all_note', (req, res) => {
    Note.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.status(400).json({ code: 400, message: 'get note fail' });
            console.log(err);
        }
    });
});

//get single note
router.get('/api/note/:id', (req, res) => {
    Note.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.status(400).json({ code: 400, message: 'get note fail' });
            console.log(err);
        }
    });
});

//save note
router.post('/api/note/save', (req, res) => {
    const note = new Note({
        note_title: req.body.note_title,
        color: req.body.color,
        note_content: req.body.note_content,
        image: req.body.image
    });
    note.save((err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Note saved successfully', addNote: data });
        } else {
            res.status(400).json({ code: 400, message: 'Note create fail' });
            console.log(err);
        }
    });
});

//update note
router.put('/api/note/update/:id', (req, res) => {
    const note = {
        note_title: req.body.note_title,
        color: req.body.color,
        note_content: req.body.note_content,
        image: req.body.image
    };
    Note.findByIdAndUpdate(req.params.id, { $set: note }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Note updated successfully', updateNote: data });
        } else {
            res.status(400).json({ code: 400, message: 'Note updated fail' });
            console.log(err);
        }
    });
});

//delete note
router.delete('/api/note/delete/:id', (req, res) => {

    Note.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Note deleted' })
        } else {
            res.status(400).json({ code: 400, message: 'delete note fail' });
            console.log(err);
        }
    });
});

//delete image note
router.put('/api/note/delete-image/:id/:idImage', async (req, res) => {
    const idNote = req.params.id
    // const note = {
    //     image: {
    //         image_id: 1,
    //         image_title: "",
    //         image_url: "",
    //         image_caption: ""
    //     }

    Note.updateOne({ idNote }, { $unset: "image" }, (err, data) => {
        if (!err) {
            console.log(data);
            res.status(200).json({ code: 200, message: 'Note updated successfully', updateNote: data });
        } else {
            res.status(400).json({ code: 400, message: 'Note updated fail' });
            console.log(err);
        }
    });
});

//update image note
router.put('/api/note/update-image/:id', (req, res) => {
    const idNote = req.params.id
    const note = {
        image: req.body.image
    };
    Note.updateOne({ idNote }, { $set: note }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Note updated successfully', updateNote: data });
        } else {
            res.status(400).json({ code: 400, message: 'Note updated fail' });
            console.log(err);
        }
    });
});

module.exports = router;