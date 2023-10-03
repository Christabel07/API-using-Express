const express = require("express")
const fs = require("fs")
const path = require("path")

const web = express

const PORT = 4000

web.set("views", path.join(__dirname, 'views'))
web.set("view engine", "ejs")
//web.set("views", "views")

web.get("/", (req, res) =>{
res.status(200).render("index")
})

web.get("/index", (req, res) =>{
res.status(200).render("index")
})

web.get("*", (req, res) =>{
res.status(400).render("error")
})

web.listen(PORT, (req, res) =>{
console.log(`The server has started running at http://localhost:${PORT}`)
})
