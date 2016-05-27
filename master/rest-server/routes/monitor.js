import SlaveService from "../services/SlaveService"

export default function(ws) {
  console.log("...");
  ws.on("connection", (socket) => {
    console.log("ok");
    console.log(SlaveService.all());
    let hosts = SlaveService.all()
    hosts.forEach(h => {
      console.log(h);
      SlaveService.startMonitoring(h, (infos) => {
        socket.send(JSON.stringify({
          host: h,
          infos
        }))
      })
    })
  })
}
