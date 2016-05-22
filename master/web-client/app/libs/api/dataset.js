import Api from "./api"

export default class extends Api {
  static post(data) {
    return super.call("datasets", {
      method: "POST",
      body: data
    })
  }

  static all() {
    return super.call("datasets")
  }

  static getDownloadLink(id) {
    return (`${super.getApiUrl()}datasets/${id}.phy`)
  }

  static get(id) {
    return super.call(`datasets/${id}`)
  }

  static addTree(dsId, data) {
    return super.call(`datasets/${dsId}/startTrees`, {
      body: data,
      method: "POST"
    })
  }

  static getStartTreeDownloadLink(dsId, treeId) {
    return (`${super.getApiUrl()}datasets/${dsId}/startTrees/${treeId}.nwk`)
  }
}
