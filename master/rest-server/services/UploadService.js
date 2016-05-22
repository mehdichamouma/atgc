
import schema from "../schemas/upload"
import mongoose from "mongoose"
import {upload} from "../models"

export default class UploadService {

  /**
  * Save a dataset in the db
  */
  static create(files) {
    return upload.create({
      uploadedAt: Date.now(),
      files: files
    })
  }

  /**
  * Find all datasets from the db
  */
  static findOne(uploadId) {
    return upload.findOne({_id: uploadId})
  }

  /**
  *
  */

}
