import express from "express"
import multer from "multer"
import UploadService from "../services/UploadService"
import path from "path"
import config from "../config"

var storage = multer.diskStorage({
  filename(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  },
  destination(req, file, cb) {
      cb(null, path.join(config.working_directory, "tmp"))
  },
})

let upload = multer({dest: "temp/", storage: storage})
let router = express.Router()

router.post("/", upload.array("files", 15), (req, res) => {
  let files = req.files.map(f => ({
    path: f.path,
    originalname: f.originalname,
    mimetype: f.mimetype
  }))

  UploadService.create(files).then(output => {
    res.json({
      files_uploaded: output.files.length,
      upload_id: output._id
    })
  })
  .catch(e => {
    console.error(e)
    res.status(500).json(e)
  })
})
export default router
