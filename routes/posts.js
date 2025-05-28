const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Tampilkan form tambah post
router.get('/create', (req, res) => {
    res.render('posts/create', {
        title: '',
        content: '',
        messages: {}
    });
});

// Simpan data post
router.post('/store', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

    if (!title || !content) {
        return res.render('posts/create', {
            title: title,
            content: content,
            messages: { error: 'Semua field wajib diisi!' }
        });
    }

    let query = "INSERT INTO posts (title, content) VALUES (?, ?)";
    db.query(query, [title, content], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/');
    });
});

module.exports = router;