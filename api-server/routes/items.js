const express = require ("express")
const bodyParser = require ("body-parser")
const fs = require ("fs")
//const path = require ("path")

const itemsRoute = express.Router()

itemsRoute.use(bodyParser.json())

//To get all item
//const itemsPath = path.join(__dirname, "./db/items.json")
itemsRoute.get("/" , (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json")
  res.status(200).send(itemsDb)
})

//To get one item
itemsRoute.get("/:id", (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json")
  const items = JSON.parse(itemsDb)

  const id = req.params.id

  const foundItem = items.find((item) => {
    return item.id === parseInt(id)
  })

  if(!foundItem){
    res.status(404).send("item not found")
    return
  }
  res.status(200).json(foundItem)
})


//To post an item
itemsRoute.post("/" , (req, res) =>{
const itemsDb = fs.readFileSync("./db/items.json")
const items = JSON.parse(itemsDb)
const itemsToPost = req.body

const lastId = items[items.length-1].id 
const newId = lastId + 1

const postWithId = {...itemsToPost, id:newId}
items.push(postWithId)

fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
  if(err){
    res.status(500)
  }
  res.status(200).json(postWithId)
})
}) 

//To update an item
itemsRoute.put("/:id", (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json")
  const items = JSON.parse(itemsDb)

const update = req.body

const id = req.params.id
const foundIndex = items.findIndex((item) => {
    return item.id === parseInt(id)
})

if(foundIndex === -1){
  res.status(404)
  res.end("id not found")
}

items[foundIndex] = {...items[foundIndex], ...update}

fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
  if(err){
    res.status(500)
    return
  }
  res.json(items[foundIndex])
}) 
})

//To delete an item
itemsRoute.delete("/:id", (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json")
  const items = JSON.parse(itemsDb)

const id = req.params.id

const foundIndex = items.findIndex((item) => {
    return item.id === parseInt(id)
})
if (foundIndex===-1){
  res.status(404).send(`item with index ${id} not found`)
  return
}else{items.splice(foundIndex, 1)}

fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
  if(err){
    res.status(500).send("internal server error")
    return
  }
  res.status(200).send(`item at id ${id} successfully deleted`)
}) 

})

module.exports = itemsRoute

