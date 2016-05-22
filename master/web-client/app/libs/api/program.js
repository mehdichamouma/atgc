import Api from "./api"

export default class extends Api {
  static addProgram(data) {
    return super.call("programs", {
      method: "POST",
      body: data
    })
  }

  static allPrograms() {
    return super.call("programs")
  }

  static addVersion(versionData) {
    return super.call(`programs/${versionData.programName}/versions`, {
      method: "POST",
      body: versionData
    })
  }

  static addConfiguration(programName, config) {
    return super.call(`programs/${programName}/configurations`, {
      method: "POST",
      body: config
    })
  }

  static get(programName) {
    return super.call(`programs/${programName}`)
  }
}
