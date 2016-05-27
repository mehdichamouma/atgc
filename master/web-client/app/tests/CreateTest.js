import React from "react"
import {fromJS, List, Map} from "immutable"
import Page from "../components/Page"
import {Panel, Row, Col, Button, ButtonGroup, Form, FormControl, FormGroup, ControlLabel, PanelGroup, Checkbox} from "react-bootstrap"
import DatasetTable from "../components/DatasetTable"
import TreesTable from "../components/TreesTable"
import test from "../libs/api/test"

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
        selected_program: 0,
        selected_version: 0,
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
    console.log(this.state);
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
      <Button bsStyle="primary" disabled={!this.canSubmitTest()} onClick={this.submitTest.bind(this)}>
        Submit
      </Button>
    )
  }

  canSubmitTest() {
    return true
  }

  submitTest() {
    var programs = []
    this.state.selected_versions.forEach(sv => {
      let pi = sv.get("programIndex")
      let vi = sv.get("versionIndex")
      let version = {
        code: this.state.programs.getIn([pi, "versions", vi, "code"]),
        configurations: sv.get("selectedConfigurations").map(index => {
          return this.state.programs.getIn([pi, "configurations", index])
        })
      }
      let pname = this.state.programs.getIn([pi, "name"])
      let program = programs.find(p => p.name == pname)
      if(program) {
        program.versions.push(version)
      }
      else {
        programs.push({
          name: pname,
          versions: [version]
        })
      }
    })

    let datasets = this.state.selected_datasets.map(sd => {
      let d = this.state.datasets.get(sd.get("datasetIndex"))
      return {
        _id: d.get("_id"),
        title: d.get("title"),
        starting_trees: sd.get("starting_trees").map(ti => ({
          _id: d.getIn(["starting_trees", ti, "_id"])
        }))
      }
    }).toJS()

    console.log(JSON.stringify({
      name: "New test",
      description: "No Description",
      datasets,
      programs
    }))
    test.post({
      name: "New test",
      description: "No Description",
      datasets,
      programs
    }).then(() => {
      console.log("ok");
    })
  }

  renderDatasetsTable() {
    return (
      <Panel header="Select Datasets" className={"select-datasets"}>
        <DatasetTable
          selectable
          noAction
          datasets={this.state.datasets}
          selectedRows={this.state.selected_datasets.map(sd => sd.get("datasetIndex"))}
          onSelect={this.onDSSelect.bind(this)}
        />
      </Panel>
    )
  }

  renderStartingTreesStep() {
    let datasets = this.state.datasets.filter((_, i) => this.state.selected_datasets.includes(i))
    return (
      <div>
        {this.state.selected_datasets.map((sd, index) => {
          let d = this.state.datasets.get(sd.get("datasetIndex"))
          if(d.get("starting_trees").size > 0) {
            return (
              <Panel bsStyle="success" header={d.get("title")}>
                <TreesTable
                  trees={d.get("starting_trees")}
                  onSelect={treeIndex => this.onTreeSelect(index, treeIndex)}
                  selectedRows={sd.get("starting_trees")}
                  selectable
                />

              </Panel>
            )
          }
        })}
      </div>
    )
  }

  onTreeSelect(di, ti) {
    let sdkey = this.state.selected_datasets.findIndex(sd => sd.get("datasetIndex") == di)
    if(sdkey >= 0) {
      let tkey = this.state.selected_datasets.getIn([sdkey, "starting_trees"]).keyOf(ti)
      this.setState({
        selected_datasets: this.state.selected_datasets.updateIn([sdkey, "starting_trees"], sts => {
          return tkey >= 0 ? sts.delete(tkey) : sts.push(ti)
        })
      })
    }
  }

  renderSelectConfigurationsStep() {
    if(this.state.programs.size > 0) {
        let versionForm
        if(this.state.form.get("selected_program") >= 0) {
          versionForm = (
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Version</ControlLabel>
              {' '}
              <FormControl
                componentClass="select"
                placeholder="Select Configuration"
                onChange={e => this.versionChange(e.target.value)}
                value={this.state.form.get("selected_version")}
              >
                {this.getProgram(this.state.form.get("selected_program")).get("versions").map((v, index) => {
                    return (
                      <option value={index}>{v.get("code")}</option>
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
                      onChange={e => this.programChange(e.target.value)}
                      value={this.state.form.get("selected_program")}
                    >
                      {this.state.programs.map((p, index) => {
                        if(p.get("versions").size > 0) {
                          return (
                            <option value={index}>{p.get("name")}</option>
                          )
                        }

                      })}
                    </FormControl>
                  </FormGroup>
                  {' '}
                  {versionForm}
                  {' '}
                  <Button type="submit" bsStyle="primary" onClick={this.addVersion.bind(this)} disabled={!this.canSubmitVersion()}>
                    Add Version
                  </Button>
                </Form>
            </Panel>
            <PanelGroup>
              {this.state.selected_versions.map(v => {
                let pi = v.get("programIndex"),
                    vi = v.get("versionIndex"),
                    program = this.getProgram(pi),
                    version = this.getVersion(pi, vi),
                    header = `${program.get("name")} - ${version.get("code")}`

                return (
                      <Panel bsStyle={"primary"} header={header}>
                            {program.get('configurations').map((c, index) => {
                              let checked = v.get("selectedConfigurations").includes(index)
                              return (
                                    <Checkbox
                                        checked={checked}
                                        onClick={() => this.onSelectConfiguration(pi, vi, index)}
                                        readOnly
                                    >
                                      {c.get("label")}
                                    </Checkbox>
                              )
                            })}
                        </Panel>
                )
              })}
            </PanelGroup>
          </div>
        )
    }
  }

  onSelectConfiguration(pi, vi, ci) {

    let svi = this.state.selected_versions.findIndex(sv => sv.get("programIndex") == pi && sv.get("versionIndex") == vi)
    if(svi >= 0) {
        let i = this.state.selected_versions.getIn([svi, "selectedConfigurations"])
                                            .keyOf(ci)

        this.setState({
          selected_versions: this.state.selected_versions.updateIn([svi, "selectedConfigurations"], sc => {
            return i >= 0 ?  sc.delete(i) : sc.push(ci)
          })
        })
    }
  }

  getProgram(index) {
    return this.state.programs.get(index)
  }

  getVersion(programIndex, versionIndex) {
    return this.state.programs.getIn([programIndex, "versions", versionIndex])
  }

  programChange(newIndex) {
    this.setState({
      form: this.state.form.set("selected_program", newIndex)
                           .set("selected_version", 0)
    })
  }

  versionChange(newIndex) {
    this.setState({
      form: this.state.form.set("selected_version", newIndex)
    })
  }

  canSubmitVersion() {
    let r = this.state.selected_versions.findIndex(sv => {
      return sv.get("versionIndex") == this.state.form.get("selected_version") && sv.get("programIndex") == this.state.form.get("selected_program")
    })
    return r === -1
  }

  onDSSelect(index) {
    let key = this.state.selected_datasets.findIndex(sd => sd.get("datasetIndex") == index)
    this.setState({
      selected_datasets: key >= 0 ? this.state.selected_datasets.delete(key) : this.state.selected_datasets.push(Map({
        datasetIndex: index,
        starting_trees: List()
      }))
    })
  }

  addVersion() {
    this.setState({
      selected_versions: this.state.selected_versions.push(Map({
        programIndex: this.state.form.get("selected_program"),
        versionIndex: this.state.form.get("selected_version"),
        selectedConfigurations: List()
      }))
    })
  }
}
