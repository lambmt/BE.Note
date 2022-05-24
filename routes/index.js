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
            console.log(err);
        }
    });
});

//get single note
router.get('/api/note/:id', (req, res) => {
    Note.findById(req.params.id, (err, data) => {
        if (!err) {
            res.end(data);
        } else {
            console.log(err);
        }
    });
});

//save note
router.post('/api/note/save', (req, res) => {
    const note = new Note({
        note_title: req.body.note_title,
        color: req.body.color,
        note_content: req.body.note_content
    });
    note.save((err, data) => {
        if(!err){
            res.status(200).json({code: 200, message: 'Note saved successfully', addNote: data});
        } else {
            console.log(err);
        }
    });
});

//update note
router.put('/api/note/update/:id', (req, res) => {
   const note = {
        note_title: req.body.note_title,
        color: req.body.color,
        note_content: req.body.note_content
   };
   Note.findByIdAndUpdate(req.params.id, { $set:note}, {new:true}, (err, data) => {
       if(!err){
           res.status(200).json({code:200, message: 'Note updated successfully', updateNote: data});
       } else {
           console.log(err);
       }
   });
});

//delete note
router.delete('/api/note/:id', (req, res) => {

    Note.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Note deleted', deleteNote: data})
        } else {
            console.log(err);
        }
    });
});

module.exports = router;