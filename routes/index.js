"use strict";

const router = require('express').Router();
const { postNewBook,
    searchBook,
    getAll,
    getOneBook } = require('../controller/index')
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});
router.post('/books', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), postNewBook);
router.get('/booksearch', searchBook);
router.get('/book/:id', getOneBook);
router.get('/all', getAll);


module.exports=router;
