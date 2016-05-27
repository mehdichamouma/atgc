import React from "react"
import DataGrid from "./DataGrid"
import Chart from "./Chart"
import {Row, Col, ButtonGroup, Button, Glyphicon, Panel} from "react-bootstrap"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: "datagrid"
    }
  }

  render() {
    let current
    switch (this.state.currentView) {
      case "datagrid":
        current = (<DataGrid {...this.props} fill/>)
        break;
      default:
        current = (<Chart {...this.props}/>)
    }

    return (
        <div>
          <Row>
              <Col md={8}>
                <h3>Datagrid Visualization</h3>
              </Col>
              <Col md={4}>
              <ButtonGroup bsSize="large" className="pull-right">
                <Button
                    onClick={() => this.setState({currentView: "datagrid"})}
                    active={this.state.currentView === "datagrid"}
                >
                  <Glyphicon glyph="th"/>
                </Button>
                <Button
                    onClick={() => this.setState({currentView: "chart"})}
                    active={this.state.currentView === "chart"}
                >
                  <Glyphicon glyph="stats
                  "/></Button>
              </ButtonGroup>
              </Col>
          </Row>
          <Row>
            <Panel>
              {current}
            </Panel>

          </Row>
        </div>
    )
  }
}
