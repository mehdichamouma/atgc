import express from "express"
import path from "path"

import ProgramService from "../services/ProgramService"

let router = express.Router()

router.get("/", (req, res) => {
  ProgramService.allPrograms().then(output => res.json(output))
})

router.post("/", (req, res) => {
  console.log(req.body);
  ProgramService.addProgram({
    programName: req.body.name,
    description: req.body.description
  }).then(output => res.json(output))
})

router.get("/:name", (req, res) => {
  ProgramService.get(req.params.name).then(p => res.json(p))
})

router.post("/:name/configurations", (req, res) => {
  ProgramService.addConfiguration({
    programName: req.params.name,
    label: req.body.label,
    description: req.body.description,
    command: req.body.command
  }).then(output => res.json(output))
})

router.post("/:name/versions", (req, res) => {
  console.log(req.body);
  ProgramService.addVersion(req.body)
  .then(() => {
    res.json("ok")
  })
})
export default router
