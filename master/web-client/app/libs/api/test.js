import Api from "./api"

export default class extends Api {
  static post(data) {
    return super.call("tests", {
      method: "POST",
      body: data
    })
  }

  static all() {
    return super.call("tests")
  }
}
