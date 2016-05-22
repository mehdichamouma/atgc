import {Schema} from "mongoose"

let dataset = new Schema({
  title: String,
  description: String,
  type: String,
  path: String,
  nSpecis: Number,
  sequenceLength: Number,
  size: Number,
  createdAt: Date,
  starting_trees: [{
    path: String,
    label: String,
    description: String,
    size: Number
  }]
})

export default dataset
