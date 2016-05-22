import {Schema} from "mongoose"

let program = new Schema({
  name: String,
  versions: [{
    code: String,
    description: String,
    creationDate: Date,
    binary: {
      path: String,
      size: Number
    }
  }],
  configurations: [{
    label: String,
    description: String,
    command: String,
    creationDate: Date,
    compatibleVersions: []
  }]
})

export default program
