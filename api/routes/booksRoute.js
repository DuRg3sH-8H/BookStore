import express from 'express';
import { Book } from "../models/bookModel.js"


const router = express.Router();

// create a new book in the database
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({ message: "send all required fields" });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
  //get all books from the database
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  //get one book from the database
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
  
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
  //update book
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({ message: "send all required fields" });
      }
      const { id } = req.params;
      const book = await Book.findById(id);
  
      const result = await Book.findByIdAndUpdate(id,req.body);
  
      if (!result){
          return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message:"Book successfully updated"});
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
  //delete the existing book
  router.delete("/:id", async (req, res) => {
    try {
  
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result){
          return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message:"Book successfully deleted" });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
export default router;