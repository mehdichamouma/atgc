import process from "process"

export default {
  mongodb_host: process.env.ATGC_MONGO_HOST || "localhost",
  mongodb_port: process.env.ATGC_MONGO_PORT || "27017",
  mongodb_dbname: process.env.ATGC_MONGO_DBNAME || "atgc",
  working_directory: process.env.ATGC_WORKING_DIRECTORY || "/etc/atgc"
}
