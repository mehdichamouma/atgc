import schema from "../schemas/upload"
import mongoose from "mongoose"
import {program, upload} from "../models"
import path from "path"
import fs from "fs"
import promisify from "es6-promisify"
import config from "../config"

export default class ProgramService {

  /**
  * Save a dataset in the db
  */
  static addVersion({programName, versionCode, uploadId, description}) {
    return upload.findOne({_id: uploadId})
      .then(u => {
          if(u && u.files) {
            let oldPath = u.files[0].path
            let rename = promisify(fs.rename)
            let stat = promisify(fs.stat)
            let newPath = path.join(config.working_directory, "bin", `${programName}-${versionCode}`)
            return rename(oldPath, newPath)
                   .then(() => stat(newPath))
                   .then(s => program.update({name: programName}, {
                     "$push": {
                       versions: {
                         code: versionCode,
                         description: description,
                         creationDate: Date.now(),
                         binary: {
                           path: newPath,
                           size: s.size
                         }
                       }
                     }
                   }))
          }
      })
  }

  static addProgram({programName, description}) {
    return program.create({
      name: programName,
      description
    })
  }

  static addConfiguration({programName, label, command, description}) {
    return program.update({name: programName}, {
      "$push": {
        configurations: {
          command,
          label,
          description,
          creationDate: Date.now()
        }
      }
    })
  }

  static get(programName) {
    return program.findOne({name: programName})
  }
  /**
  * Return all the programs
  */
  static allPrograms() {
    return program.find({})
  }

  /**
  *
  */

}
