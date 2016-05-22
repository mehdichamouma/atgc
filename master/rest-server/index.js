import express from "express"
import bodyParser from 'body-parser'

import process from "process"
import fs from "fs"
import path from "path"

import config from "./config"
import mongoose from "mongoose"

import datasets from "./routes/datasets"
import upload from "./routes/upload"
import programs from "./routes/programs"

let app = express()
app.use("/api/upload", upload)

let api = express.Router()

api.use(bodyParser.json())
api.use("/datasets", datasets)
api.use("/programs", programs)

//Server will serve the JSON Rest API on /api...
app.use("/api", api)
app.use("/api/*", (req, res) => {
  res.status(404).json("URI does not match any endpoints")
})
//... and the assets on /public
app.use("/public", express.static( 'public/'))


//Otherwise, the server will serve the client
app.use("*", (req, res) => {
  let dirname = process.cwd();
  res.set("Cache-Control", 'no-cache, no-store, must-revalidate')
  res.set("Pragma", "no-cache")
  res.set("Expires", "0")
  res.sendFile("public/index.html", {root: dirname});

})

//Creates directories
let dirs = ["datasets", "bin", "tmp", "trees"]
dirs.forEach(d => {
  let dir = path.join(config.working_directory, d)
  if(!fs.existsSync(dir)) {
    console.log("Creation of " + dir)
    fs.mkdirSync(dir)
  }
})

let uri = `mongodb://${config.mongodb_host}:${config.mongodb_port}/${config.mongodb_dbname}`
mongoose.connect("mongodb://localhost/test").then(() => {
  console.log("connected to db");
  app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
  });
})
