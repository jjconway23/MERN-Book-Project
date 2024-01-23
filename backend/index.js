const express = require("express");
const mongoose = require("mongoose")
const app = express()
const Book = require('./models/bookModel')

app.use(express.json())

app.get("/", (req, res)=> {
    res.send("Welcome to MERN")
})

// Get all books from database
app.get('/books', async (req, res)=> {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    }
    catch (error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

//get a book
app.get('/books/:id', async (req, res)=> {
    try{
        const {id} = req.params;
        const chosenBook = await Book.findById(id);
        return res.status(200).json(chosenBook)
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})
// update Book route
app.put('/books/:id', async (req,res)=> {
    try {
        if(
            !req.body.title,
            !req.body.author,
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            }); 
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) {
            return res.status(404).json({message: 'Book not found!'})
        }
        return res.status(200).send({message: 'Book updated sussessfully'});
    }
    catch(error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})
// create a new book
app.post('/books', async (req, res)=> {
    try {
        if(!req.body.title || !req.body.author||!req.body.publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book)
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})
mongoose
    .connect("mongodb+srv://admin:admin@mern-book-store.v5olxpc.mongodb.net/?retryWrites=true&w=majority")
    .then(()=> {
        console.log("App connected to Mongo Database")
        app.listen(5555, ()=> {
            console.log(`App running on ${5555}`)
        })
    })
    .catch((error)=> console.log(error))