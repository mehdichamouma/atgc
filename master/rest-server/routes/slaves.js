import express from "express"
import path from "path"

import SlaveService from "../services/SlaveService"

let router = express.Router()

router.post("/", (req, res) => {
  SlaveService.createHost(req.body.host)
  .then((res) => {
    res.json(res)
  })
})

router.get("/", (req, res) => {
  res.json(SlaveService.all())
})

router.delete("/:host", (req, res) => {
  SlaveService.removeHost(req.params.host)
  .then(() => {
    res.json("ok")
  })
})
export default router
