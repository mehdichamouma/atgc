import React from "react"
import Page from "../components/Page"
import {List, fromJS} from "immutable"
import {Line} from "react-chartjs"
import {Panel, Row, Col} from "react-bootstrap"
import {floor} from "lodash"

let ws
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workers: List()
    }
  }

  componentWillMount() {
    ws = new WebSocket("ws://localhost:3000/monitor")
    ws.onmessage = (e) => {
      let message = JSON.parse(e.data)
      console.log(message);
      let workerPosition = this.state.workers.findIndex(w => w.get("host") === message.host)
      if(workerPosition >= 0) {
        this.setState({
          workers: this.state.workers.update(workerPosition, w => w.update("metrics", metrics => metrics.push(fromJS(message.infos))))
        })
      }
      else {
        this.setState({
          workers: this.state.workers.push(fromJS({
            host: message.host,
            metrics: [message.infos]
          }))
        })
      }
    }
  }

  componentWillUnmount() {
    console.log("unmount");
      if(ws) {
        ws.close()
      }
  }

  render() {
    let chartOptions = {
      scales: {
        xAxes: [{type: "time", id:"x-axis-0"}],
        yAxes: [{
          ticks: {
            callback: (tick, index, tickArray) => {
              return floor(tick*100, 2)+ "%"
            }
          }
        }],
      }
    }
    let charts = this.state.workers.map(w => {
      let labels = w.get("metrics").map(m => m.get("timestamp")).toJS().slice(-20)
      let datasets = [{
        data: w.get("metrics").map(m => {
          return m.get("freemem") / m.get("totalmem")
        }).toJS().slice(-20),
        label: "Memory",
        fill: false,
        borderColor: "rgb(200, 0, 0)"
      },
      {
        label: "CPU Usage",
        fill: false,
        data: w.get("metrics").map(m => {
          return m.get("cpuUsage")
        }).toJS().slice(-20),
        borderColor: "rgb(0, 200, 0)"
      }]
      console.log(labels, datasets);
      return (
        <Line data={{labels, datasets}} options={chartOptions} />
      )
    })
    return (
      <Page title="Dashboard">
        <Row>
          <Col md="8">
            <Panel header="Monitoring">
              {charts}
            </Panel>
          </Col>
        </Row>
      </Page>
    )
  }
}
