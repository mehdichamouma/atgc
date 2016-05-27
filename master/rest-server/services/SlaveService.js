import WebSocket from "ws"
import events from "events"
import {slave as slaveModel} from "../models"

class SlaveService {

  constructor() {
    this.slaves = []
  }

  init() {
      return slaveModel.find({}).then(slaves => {
        console.log(slaves);
        return Promise.all(slaves.map(s => {
          return this.connect(s.host)
        }))
      })
  }

  connect(host) {
    return new Promise((resolve, reject) => {
      let ws = new WebSocket(`ws://${host}`)
      ws.on("open", () => {
        console.log("connected to " + host);
        let slave = {
          host: host,
          socket: ws,
          eventEmitter: new events.EventEmitter()
        }
        this.slaves.push(slave)

        ws.on("message", data => {
          console.log(data);
          let msg = JSON.parse(data)
          switch (msg.type) {
            case "monitor":
              slave.eventEmitter.emit("monitor", msg.payload)
              break;
            default:

          }
        })
        resolve()
      })
    })
  }

  get(host) {
    return this.slaves.find(s => s.host === host)
  }

  all() {
    return this.slaves.map(s => s.host)
  }

  createHost(host) {
    return slaveModel.create({
      host: host
    }).then(() => this.connect(host))
  }
  send(host, type, message) {
    this.get(host).socket.send(JSON.stringify({
      type: type,
      payload: message
    }))
  }

  startMonitoring(host, listener) {
    this.send(host, "monitor", true)
    console.log(this.get(host))
    this.get(host).eventEmitter.on("monitor", listener)
  }
}

export default new SlaveService()
