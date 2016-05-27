import React from "react"
import {Line} from "react-chartjs"
import colorsGenerator from "distinct-colors"
import color from "color"
import {humanizer} from "../libs/helpers"
import {max} from "lodash"

export default class extends React.Component {
  render() {
    let {datasets, configurations, results} = this.props
    let colors = colorsGenerator({count: datasets.length, format: "rgb"})
    console.log(colors);
    let chartData = {
      labels: configurations.map(c => `${c.name}-${c.versionCode}@T3000`),
      datasets: datasets.map((d, index) => ({
        label: d.title,
        data: results[index].map(r => r ? r.time : null),
        borderColor: colors[index].css(),
        backgroundColor: colors[index].alpha(0.2).css()
      }))
    }
    console.log(1234);
    let chartOptions = {
      scales: {
          yAxes: [{
            ticks: {
              callback: (tick, index, tickArray) => {
                return humanizer(tick, { largest: 1 })
              }
            }
          }],
      }

    }

    return (
    <div>
      <Line
          data={chartData}
          options={chartOptions}
          width="600"
          height="250"
      />
    </div>
    )
  }
}
