import Api from "./api"

export default class extends Api {
  static add(data) {
    return super.call("workers", {
      method: "POST",
      body: data
    })
  }

  static all() {
    return super.call("workers")
  }
}
