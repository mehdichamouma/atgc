import React from "react"
import ResultVisualizer from "../components/ResultVisualizer"
import Page from "../components/Page"

export default class extends React.Component {

  render() {
    let ds = [
      {title: "RX_001.phy"},
      {title: "RX_002.phy"},
      {title: "RX_003.phy"},
      {title: "RX_004.phy"},
      {title: "RX_005.phy"},
      {title: "RX_006.phy"},
    ]

    let cnf = [
      {name: "PhyML", versionCode: "1.0.0", configuration: {label: "Basics settings with"}},
      {name: "PhyML", versionCode: "3.1.0", configuration: {label: "Basics settings with t set to 3000"}},
      {name: "RaxML", versionCode: "1.0.0", configuration: {label: "Basics settings"}},
      {name: "IQTREE", versionCode: "1.0.0", configuration: {label: "With newton method"}},
    ]

    let results = [
      [ {time: 120002, max: 10210}, {time: 1120002, max: 11200}, {time: 102102, max: 9700}, {time: 123056, max: 600} ],
      [ {time: 23120002, max: 12000}, {time: 112054, max: 12000}, {time: 1233212, max: 12000}, {time:1234567, max: 13200} ],
      [ {time: 3333, max: 13200}, {time: 44444, max: 13200}, {time: 120002, max: 12000}, {time: 120002, max: 12000} ],
      [ {time: 13413, max: 13200}, {time: 15555, max: 16500}, {time: 12378900, max: 12000}, {time: 112341234, max: 12000} ],
      [ {time: 111111, max: 12000}, {time: 1123432, max: 20000}, {time: 1123213, max: 9000}, {time: 11432143, max: 12000} ],
      [ {time: 1000000, max: 12000}, {time: 1123213, max: 9000}, {time: 10101010, max: 12000}, {time: 123901, max: 500} ],
    ]
    return (
      <Page title={"Result of the test - 10/10/2016 16:53"}>
        <ResultVisualizer datasets={ds} configurations={cnf} results={results}/>
      </Page>
    )
  }
}
