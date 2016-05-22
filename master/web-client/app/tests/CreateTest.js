import React from "react"
import {fromJS, List, Map} from "immutable"
import Page from "../components/Page"
import {Panel, Row, Col, Button, ButtonGroup, Form, FormControl, FormGroup, ControlLabel, PanelGroup} from "react-bootstrap"
import DatasetTable from "../components/DatasetTable"
import TreesTable from "../components/TreesTable"

import dataset from "../libs/api/dataset"
import program from "../libs/api/program"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datasets: List(),
      programs: List(),
      selected_datasets: List(),
      selected_versions: List(),
      step: 1,
      form: Map({
        selected_program: null,
        selected_version: null
      })
    }
  }

  componentWillMount() {
    Promise.all([
      dataset.all(),
      program.allPrograms()
    ]).then(([ds, pgrms]) => {
      this.setState({
        datasets: fromJS(ds),
        programs: fromJS(pgrms)
      })
    })
  }
  render() {
    let step
    switch (this.state.step) {
      case 1:
        step = this.renderDatasetsTable()
        break;
      case 2:
        step = this.renderStartingTreesStep()
        break;
      case 3:
        step = this.renderSelectConfigurationsStep()
        break;
    }
    return (
      <Page title={"New test"}>
        {step}
        <Row>
          <Col sm={12}>
              <ButtonGroup className="pull-right">
                {this.state.step != 1 ? this.renderBackButton() : null}
                {this.state.step != 3 ? this.renderNextButton() : null}
                {this.state.step == 3 ? this.renderSubmitButton() : null}
              </ButtonGroup>
          </Col>
        </Row>
      </Page>
    )
  }
  renderNextButton() {
    return (
      <Button onClick={() => this.setState({step: this.state.step + 1})}>
        Next
      </Button>
    )
  }

  renderBackButton() {
    return (
      <Button onClick={() => this.setState({step: this.state.step - 1})}>
        Back
      </Button>
    )
  }

  renderSubmitButton() {
    return (
      <Button bsStyle="primary" onClick={() => {}}>
        Submit
      </Button>
    )
  }

  renderDatasetsTable() {
    return (
      <Panel header="Select Datasets" className={"select-datasets"}>
        <DatasetTable
          selectable
          noAction
          datasets={this.state.datasets}
          selectedRows={this.state.selected_datasets}
          onSelect={this.onDSSelect.bind(this)}
        />
      </Panel>
    )
  }

  renderStartingTreesStep() {
    return (
      <div>
        {this.state.selected_datasets.filter(d => d.get("starting_trees").size > 0).map(d => {
          return (
            <Panel bsStyle="success" header={d.get("title")}>
              <TreesTable trees={d.get("starting_trees")} selectable/>
            </Panel>
          )
        })}
      </div>
    )
  }

  renderSelectConfigurationsStep() {
    let versionForm
    if(this.state.form.get("selected_program")) {
      versionForm = (
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Version</ControlLabel>
          {' '}
          <FormControl
            componentClass="select"
            placeholder="Select Configuration"
            onChange={e => this.setState({form: this.state.form.set("selected_version", e.target.value)})}
            value={this.state.form.get("selected_version")}
          >
            {this.state.programs.get(this.state.form.get("selected_program")).get("versions").map((v, index) => {
              console.log(v);
              return (
                <option value={v.get("code")}>{v.get("code")}</option>
              )
            })}
          </FormControl>
        </FormGroup>
      )
    }
    return (
      <div>
        <Panel>
            <Form inline componentClass="div">
              <FormGroup controlId="formInlineName">
                <ControlLabel>Program</ControlLabel>
                {' '}
                <FormControl
                  componentClass="select"
                  placeholder="Select Configuration"
                  onChange={e => this.setState({form: this.state.form.set("selected_program", e.target.value)})}
                  value={this.state.form.get("selected_program")}
                >
                  {this.state.programs.map((c, index) => {
                    return (
                      <option value={index}>{c.get("name")}</option>
                    )
                  })}
                </FormControl>
              </FormGroup>
              {' '}
              {versionForm}
              {' '}
              <Button type="submit" bsStyle="primary" onClick={this.addVersion.bind(this)}>
                Add Version
              </Button>
            </Form>
        </Panel>
        <PanelGroup>
          {this.state.selected_versions.map(v => {
            console.log(v);
            let header = `${v.getIn(["program", "name"])} - ${v.get("code")}`
            return (<Panel bsStyle={"primary"} header={header}>
                        {v.getIn(["program", "configurations"])}
                    </Panel>)
          })}
        </PanelGroup>
      </div>
    )
  }
  onDSSelect(d) {
    let newState
    let i = this.state.selected_datasets.keyOf(d)
    if(typeof i !== "undefined") {
      newState = this.state.selected_datasets.delete(i)
    }
    else {
      newState = this.state.selected_datasets.push(d)
    }
    this.setState({
      selected_datasets: newState
    })
  }

  addVersion() {
    this.setState({
      selected_versions: this.state.selected_versions.push(Map({
        program: this.state.programs.get(this.state.form.get("selected_program")),
        code: this.state.form.get("selected_version")
      }))
    })
  }
}
