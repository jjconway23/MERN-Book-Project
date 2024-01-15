const express = require("express");
const mongoose = require("mongoose")
const app = express()

app.get("/", (req, res)=> {
    res.send("Welcome to MERN")
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