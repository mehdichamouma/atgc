import TestTable from "./TestTable"
import React from "react"
import Page from "../components/Page"
import test from "../libs/api/test"

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: []
    }
  }

  componentDidMount() {
    test.all().then(res => {
      this.setState({
        tests: res.map((t, index) => ({
          label: "Test #"+index,
          nDatasets: t.datasets.length,
          nConfig: t.configurations.length
        }))
      })
    })
  }

  render() {
    return (
        <Page title="Current Test">
          <TestTable tests={this.state.tests}/>
        </Page>
    )
  }
}
