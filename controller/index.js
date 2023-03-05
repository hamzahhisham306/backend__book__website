"use strict";

const Book = require('../schemas/Schema');

const postNewBook=async (req, res) => {
    try {
      const { title, authors, subjects, year, publisher } = req.body;
      const book = new Book({
        title,
        authors,
        subjects,
        year,
        publisher,
        coverImage: req.files['coverImage'][0].path,
        pdfFile: req.files['pdfFile'][0].path
      });
  
      const savedBook = await book.save();
  
      res.json(savedBook);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving book');
    }
  };

const searchBook=(req, res) => {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { subjects: { $regex: search, $options: 'i' } }
        ]
      };
    }
    Book.find(query).then(books => res.json(books)).catch(err => res.status(500).send(err));
  };


const getAll=async (req, res) => {
    const allbooks = await Book.find();
    return res.status(200).json(allbooks);
  };

  const getOneBook=(req, res) => {
    const id = req.params.id;
    const findBook = Book.findById(id).
    then(book => book ? res.status(200).json(book) : res.status(500).send("Book Not found")).
    catch(err => res.status(500).send(err));
  
  };

  module.exports={
    postNewBook,
    searchBook,
    getAll,
    getOneBook
  }