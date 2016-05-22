import express from "express"
import path from "path"

import DatasetService from "../services/DatasetService"

let router = express.Router()

router.get("/", (req, res) => {
  DatasetService.findAll().then(output => {
    res.json(output)
  })
})

router.post("/", (req, res) => {
  DatasetService.save({
    uploadId: req.body.upload_id,
    type: req.body.type,
    description: req.body.description
  }).then(ds => res.json(ds))
  .catch(e => {
    console.error(e);
    res.json(e)
  })
})


router.get("/:id.phy", (req, res) => {
  DatasetService.getFile(req.params.id).then(p => {
    res.set("Content-Disposition", "attachment; filename="+path.basename(p))
    res.sendFile(p)
  })
})

router.get("/:id", (req, res) => {
  DatasetService.get(req.params.id).then(output => {
    res.json(output)
  })
})

router.post("/:id/startTrees", (req, res) => {
  DatasetService.addTree(req.params.id, {
    label: req.body.label,
    description: req.body.description,
    uploadId: req.body.uploadId
  }).then(output => res.json(output))
})

router.get("/:id/startTrees/:tree_id.nwk", (req, res) => {
  DatasetService.get(req.params.id).then(ds => {
    let {tree_id} = req.params
    let t = ds.starting_trees.find(st=> st._id.equals(tree_id))
    res.set("Content-Disposition", "attachment; filename="+path.basename(t.path))
    res.sendFile(t.path)
  })
  .catch(e => res.json(e))
})

export default router
