import express from "express"
import bodyParser from 'body-parser'
import http from "http"

import process from "process"
import fs from "fs"
import path from "path"

import config from "./config"
import mongoose from "mongoose"

import datasets from "./routes/datasets"
import upload from "./routes/upload"
import programs from "./routes/programs"
import slaves from "./routes/slaves"
import monitor from "./routes/monitor"
import tests from "./routes/tests"

import SlaveService from "./services/SlaveService"
import {Server as WebSocketServer} from "ws"

let app = express()
let server = http.createServer(app)

app.use("/api/upload", upload)

let api = express.Router()

api.use(bodyParser.json())
api.use("/datasets", datasets)
api.use("/programs", programs)
api.use("/workers", slaves)
api.use("/tests", tests)

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


//...
console.log("ok");

let host = "ws://localhost:3002"
SlaveService.init().then(() => {})

let socketsHandlers = [{
  path: "/monitor",
  handleSocket: monitor
}]

socketsHandlers.forEach(handler => {
  let ws = new WebSocketServer({
    server: server,
    path: handler.path
  })
  handler.handleSocket(ws)
})

//Connect to the DB and start the server

let uri = `mongodb://${config.mongodb_host}:${config.mongodb_port}/${config.mongodb_dbname}`
mongoose.connect("mongodb://localhost/test").then(() => {
  console.log("connected to db");
  server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
})
