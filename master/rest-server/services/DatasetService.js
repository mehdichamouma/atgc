import schema from "../schemas/dataset"
import mongoose from "mongoose"
import config from "../config"
import path from "path"
import fs from "fs"
import {dataset, upload} from "../models"
import promisify from "es6-promisify"
import firstline from "firstline"
import {move} from "../libs/fileHelpers"

export default class DatasetService {

  static getPath() {
    return path.join(config.working_directory, "datasets")
  }

  static getTreePath() {
    return path.join(config.working_directory, "trees")
  }
  static saveOne({oldpath, originalname, type, description}) {
      let dest = DatasetService.getPath()
      let stat = promisify(fs.stat)
      return move(oldpath, dest, originalname)
      .then((newPath) => Promise.all([stat(newPath), firstline(newPath)])
      .then(([s, l]) => {
        let l_split = l.split(" ")
        return dataset.create({
          title: path.basename(newPath),
          description: description,
          type: type,
          path: newPath,
          size: s.size,
          nSpecis: l_split[0],
          sequenceLength: l_split[1],
          createdAt: Date.now()
        })
      }))
  }
  /**
  * Save a dataset in the db
  */
  static save({uploadId, type, description}) {
    return upload.findOne({_id: uploadId}).then(u => {
      if(u && u.files) {
        return Promise.all(u.files.map(f =>
          DatasetService.saveOne({
            oldpath: f.path,
            originalname: f.originalname,
            type: type,
            description: description
          })
        ))
      }
      return Promise.resolve([])
    })
  }

  /**
  * Find all datasets from the db
  */
  static findAll(data) {
    return dataset.find({}, null, {
      sort:{
        createdAt: -1
      }
    })
  }

  /**
  *
  */
  static getFile(id) {
    return dataset.findOne({_id: id}).then(d => {
      if(d) {
        return d.path
      }
      return ""
    })
  }

  static get(id) {
    return dataset.findOne({_id: id})
  }

  static addTree(dsId, {label, description, uploadId}) {
    return upload.findOne({_id: uploadId})
    .then(u => {
      if(u && u.files) {
        let file = u.files[0]
        return move(file.path, DatasetService.getTreePath(), file.originalname)
        .then(newPath => {
          let stat = promisify(fs.stat)
          return stat(newPath).then(s => {
            console.log(s);
            return dataset.update({_id: dsId}, {
              "$push": {
                starting_trees: {
                  path: newPath,
                  label: label,
                  description: description,
                  size: s.size
                }
              }
            })
          })

        })
      }
    })
  }
}
