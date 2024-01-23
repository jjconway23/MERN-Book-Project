const express = require("express");
const mongoose = require("mongoose")
const app = express()
// const Book = require('../backend/models/bookModel')
const bookRouter = require('./routes/booksRoute')
app.use(express.json())

app.get("/", (req, res)=> {
    res.send("Welcome to MERN")
})

app.use('/books', bookRouter);

console.log(bookRouter)
mongoose
    .connect("mongodb+srv://admin:admin@mern-book-store.v5olxpc.mongodb.net/?retryWrites=true&w=majority")
    .then(()=> {
        console.log("App connected to Mongo Database")
        app.listen(5555, ()=> {
            console.log(`App running on ${5555}`)
        })
    })
    .catch((error)=> console.log(error))