import express from "express"
import path from "path"

import TestService from "../services/TestService"

let router = express.Router()

router.get("/", (req, res) => {
  TestService.allTests().then(tests => res.json(tests))
})

router.post("/", (req, res) => {
  TestService.createTest(req.body.label, req.body.description, req.body.datasets, req.body.programs)
  .then(() => {
    res.json("ok")
  })
  .catch(e => console.error("ok"))
})



export default router
