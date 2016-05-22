import datasetSchema from "./schemas/dataset"
import uploadSchema from "./schemas/upload"
import programSchema from "./schemas/program"

import mongoose from "mongoose"

export let dataset = mongoose.model("dataset", datasetSchema)
export let upload = mongoose.model("upload", uploadSchema)
export let program = mongoose.model("program", programSchema)
