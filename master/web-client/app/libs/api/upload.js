import Api from "./api"

export default class extends Api {
  static process(files) {
    let data = new FormData()
    files.forEach(f => {
      data.append("files", f)
    })
    return super.call("upload", {
      method: "POST",
      json: false,
      body: data
    })
  }
}
