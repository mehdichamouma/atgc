import {Schema} from "mongoose"

let upload = new Schema({
  uploadedAt: Date,
  files: [{
    path: String,
    originalname: String,
    mimetype: String
  }]
})

export default upload
