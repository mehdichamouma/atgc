import React from "react"
import Page from "../components/Page"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel, FormGroup,
  ControlLabel, HelpBlock, FormControl, Form, Checkbox, Radio, Well,
  ListGroup, ListGroupItem, Tabs, Tab, Modal
} from "react-bootstrap"

import {Map, List, fromJS} from "immutable"
import DropZone from "react-dropzone"
import VersionTable from "./VersionTable"

import semver from "semver"

import AddProgramForm from "./forms/AddProgramForm"
import AddVersionForm from "./forms/AddVersionForm"

import program from "../libs/api/program"
import upload from "../libs/api/upload"

import {Link} from "react-router"

export default class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      versionForm: fromJS({
        softwareIndex: {
          value: 0
        },
        versionCode: {
          value: "",
          state: "error"
        },
        description: {
          value: ""
        },
        binaryFile: {
          value: ""
        }
      }),
      programForm: fromJS({
        name: {
          value: "",
          state: ""
        },
        description: {
          value: "",
          state: ""
        }
      }),
      programs: List()

    }
  }

  componentWillMount() {
    this.refresh()
  }

  versionFormChange(field, e) {
    if(field === "versionCode") {
        let {value} = e.target
        let newState = semver.valid(value) ? "success" : "error"
        this.setState({
          versionForm: this.state.versionForm.setIn(["versionCode", "state"], newState)
                                             .setIn(["versionCode", "value"], value)
        })
    }
    else if(field === "software") {
      this.selectSoftware(e.target.value)
    }
    else if(field === "binaryFile") {
      let file = e
      this.setState({
        versionForm: this.state.versionForm.setIn(["binaryFile", "value"], file)
      })
    }
    else {
      this.setState({
        versionForm: this.state.versionForm.setIn([field, "value"], e.target.value)
      })
    }
  }

  programSubmit() {
    program.addProgram({
      name: this.state.programForm.getIn(["name", "value"]),
      description: this.state.programForm.getIn(["description", "value"])
    }).then(() => {
      this.closeModals()
      this.refresh()
    })
  }

  closeModals() {
    this.setState({
      showProgramModal: false,
      showVersionModal: false
    })
  }
  versionSubmit() {
    upload.process([this.state.versionForm.getIn(["binaryFile", "value"])])
    .then(res1 => {
      let i = this.state.versionForm.getIn(["softwareIndex", "value"])
      let _program = this.state.programs.get(i)
      program.addVersion({
        programName: _program.get("name"),
        uploadId: res1.upload_id,
        description: this.state.versionForm.getIn(["description", "value"]),
        versionCode: this.state.versionForm.getIn(["versionCode", "value"]),
      })
      .then(res2 => {
        this.closeModals()
        this.refresh()
      })
    })
  }

  programFormChange(field, e) {
    this.setState({
      programForm: this.state.programForm.setIn([field, "value"], e.target.value)
    })
  }

  refresh() {
      program.allPrograms().then(programs => {
        this.setState({
          programs: fromJS(programs)
        })
      })
  }

  selectSoftware(key) {
    console.log(key);
    this.setState({
      versionForm: this.state.versionForm.setIn(["softwareIndex", "value"], parseInt(key))
    })
  }

  getCurrentProgram() {
    let i = this.state.versionForm.getIn(["softwareIndex", "value"])
    console.log(i);
    console.log(this.state.programs.get(i));
    return this.state.programs.get(i)
  }

  render() {
    let manageConfigurationsButton
    if(this.state.programs.size > 0) {
      manageConfigurationsButton = (<Button
                            componentClass={Link}
                            to={`softwares/${this.getCurrentProgram().get("name")}`}>Manage configurations</Button>)
    }
    return(
      <Page title="Programs">
          <Row>
                <Tabs
                  activeKey={this.state.versionForm.getIn(["softwareIndex", "value"])}
                  onSelect={this.selectSoftware.bind(this)}
                  id="controlled-tab-example"
                >
                  {this.state.programs.map((s, index) => {
                    return (
                      <Tab eventKey={index} title={s.get("name")}>
                            <VersionTable versions={s.get("versions")}/>
                      </Tab>
                    )
                  })}
                </Tabs>
            <Panel>
                <Button bsStyle="primary" onClick={() => this.setState({showVersionModal: true})}>
                    <Glyphicon glyph="upload" /> Upload version
                </Button>
                {" "}
                <ButtonGroup>
                  <Button onClick={() => this.setState({showProgramModal: true})}>Add a Program</Button>
                  {manageConfigurationsButton}
                </ButtonGroup>

            </Panel>
          </Row>
          <Modal show={this.state.showVersionModal} onHide={() => this.setState({showVersionModal: false})}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Version</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddVersionForm
                    fields={this.state.versionForm}
                    softwares={this.state.programs}
                    onChange={this.versionFormChange.bind(this)}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.versionSubmit.bind(this)} ><Glyphicon glyph="upload" /> Upload</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showProgramModal} onHide={() => this.setState({showProgramModal: false})}>
            <Modal.Header closeButton>
                <Modal.Title>New Program</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddProgramForm
                    fields={this.state.programForm}
                    onChange={this.programFormChange.bind(this)}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.programSubmit.bind(this)}><Glyphicon glyph="upload" /> Submit</Button>
            </Modal.Footer>
          </Modal>
      </Page>
    )
  }
}
