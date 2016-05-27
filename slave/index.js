import monitor from "os-monitor"
import {Server as WebSocketServer} from "ws"

let wss = new WebSocketServer({port: 3002})

let master
let monitoring = false

wss.on("connection", ws => {
  master = ws
  master.on("message", txt => {
    let msg = JSON.parse(txt)
    switch (msg.type) {
      case "monitor":
        monitoring = (msg.payload === true)
        break;
    }
  })
})

monitor.start()

monitor.on("monitor", function(event) {
  if(monitoring) {
    var os = require("os"),
    cpus = os.cpus();
    var total = 0, idle = 0
    cpus.forEach(c => {
      for(var type in c.times) {
        total = total + c.times[type]
      }
      idle += c.times.idle
    })
    console.log(cpus);
    send("monitor", Object.assign({}, event, {
      cpuUsage: (1 - (idle/total))
    }))
  }
})

let send = (type, msg) => {
  if(master) {
    master.send(JSON.stringify({
      type: type,
      payload: msg
    }))
  }
}
