import {Schema} from "mongoose"

let program = new Schema({
  name: String,
  defaultLikelihoodExtractor: String,
  versions: [{
    code: String,
    description: String,
    creationDate: Date,
    binary: {
      path: String,
      size: Number
    },
    likelihoodExtractor: String
  }],
  configurations: [{
    label: String,
    description: String,
    command: String,
    startTreeCommand: String,
    creationDate: Date,
    compatibleVersions: []
  }]
})

export default program
