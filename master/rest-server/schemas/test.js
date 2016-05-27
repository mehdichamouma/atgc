import {Schema} from "mongoose"

let test = new Schema({
  label: String,
  description: String,
  configurations: [{
    label: String,
    programName: String,
    versionCode: String,
    confId: Schema.ObjectId,
    index: Number
  }],
  datasets: [{
    title: String,
    withStartTree: {type: Boolean, default: false},
    startTreeId: Schema.ObjectId,
    index: Number,
    datasetId: Schema.ObjectId
  }],
  startedAt: Date,
  endedAt: Date,
  results: [{
    configIndex: Number,
    datasetIndex: Number,
    likelihood: Number,
    startedAt: Date,
    endedAt: Date,
    status: String
  }]
})

export default test
