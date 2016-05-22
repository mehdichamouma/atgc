import querystring from "querystring"

export default class api {
  static getApiUrl() {
    return "/api/"
  }

  static call(endpoint, options = {}) {
    let {
      body = null,
      params = {},
      method = "GET",
      json = true
    } = options

    let query
    if(params) {
      query = "?" + querystring.stringify()
    }

    let jsonHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return fetch(`${api.getApiUrl()}${endpoint + query}`, {
      body: (body && json) ? JSON.stringify(body) : body,
      method: method,
      headers: json ? jsonHeader : {}
    })
    .then(res => res.json())
  }
}
