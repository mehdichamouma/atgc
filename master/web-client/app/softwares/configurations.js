import React from "react"
import Page from "../components/Page"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel,PanelGroup, FormGroup,
  ControlLabel, HelpBlock, FormControl, Form, Checkbox, Radio, Well,
  ListGroup, ListGroupItem, Tabs, Tab, Modal, InputGroup
} from "react-bootstrap"

import {Map, List, fromJS} from "immutable"
import DropZone from "react-dropzone"
import VersionTable from "./VersionTable"

import semver from "semver"

import AddProgramForm from "./forms/AddProgramForm"
import AddVersionForm from "./forms/AddVersionForm"

import program from "../libs/api/program"
import upload from "../libs/api/upload"

export default class Configurations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addConfigurationForm: fromJS({
        command: {
          value: "",
          state: ""
        },
        description: {
          value: "",
          state: ""
        },
        label: {
          value: "",
          state: ""
        },
        STSupport: {
          value: false,
        }
      }),
      program: null
    }
  }

  componentWillMount(nextProps) {
    this.fetchProgram()
  }

  fetchProgram() {
    program.get(this.props.params.programName).then(output => {
      this.setState({program: fromJS(output)})
    })
  }

  submitConfiguration() {
    program.addConfiguration(this.props.params.programName, {
      label: this.state.addConfigurationForm.getIn(["label", "value"]),
      description: this.state.addConfigurationForm.getIn(["description", "value"]),
      command: this.state.addConfigurationForm.getIn(["command", "value"])
    }).then((res) => {
      this.fetchProgram()
    })
  }

  changeAddConfigurationForm(field, e) {
    let value
    if(field === "STSupport") {
      value = !this.state.addConfigurationForm.getIn(["STSupport", "value"])
      if(value && !this.state.addConfigurationForm.getIn(["STCommand", "value"])) {
        let newValue = this.state.addConfigurationForm.getIn(["command", "value"])
        this.setState({
          addConfigurationForm: this.state.addConfigurationForm.setIn(["STCommand", "value"], newValue)
        })
      }
    }
    else {
      value = e.target.value
    }
    this.setState({
      addConfigurationForm: this.state.addConfigurationForm.setIn([field, "value"], value)
    })
  }
  render() {
    console.log(this.state);

    return(
      <Page title={this.props.params.programName + " configurations"}>
        <Panel header="Add a configuration" bsStyle={"primary"}>
          <Form horizontal componentClass="div">
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Label
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  placeholder="Enter a label"
                  onChange={(e) => this.changeAddConfigurationForm("label", e)}
                  value={this.state.addConfigurationForm.getIn(["label", "value"])}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Command
              </Col>
              <Col sm={10}>
                <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl
                      type="text"
                      placeholder="Enter the command"
                      onChange={(e) => this.changeAddConfigurationForm("command", e)}
                      value={this.state.addConfigurationForm.getIn(["command", "value"])}
                    />
                </InputGroup>
                <HelpBlock>
                  Enter the command to be executed with this placeholders
                  <ul>
                    <li><strong>#cmd</strong>: the command</li>
                    <li><strong>#input</strong>: path to the .phy file</li>
                  </ul>
                </HelpBlock>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={Well} smOffset={2} sm={10}>
                  <Checkbox
                      checked={this.state.addConfigurationForm.getIn(["STSupport", "value"])}
                      onClick={() => this.changeAddConfigurationForm("STSupport")}
                  >
                  Starting Tree Support
                  </Checkbox>
                  <br/>
                  {this.state.addConfigurationForm.getIn(["STSupport", "value"]) ? this.renderStartingTreeForm() : null}
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter the configuration description"
                  onChange={(e) => this.changeAddConfigurationForm("description", e)}
                  value={this.state.addConfigurationForm.getIn(["description", "value"])}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" onClick={this.submitConfiguration.bind(this)}>
                  Send
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>

            {this.renderConfigs.bind(this)()}

      </Page>
    )
  }

  renderConfigs() {
    if(this.state.program && this.state.program.get("configurations")) {
      return (
        <PanelGroup defaultActiveKey="0" accordion>
        {this.state.program.get("configurations").map((c, index) => {
          return (
            <Panel header={`#${index} - ${c.get('label')}`} eventKey={index} >
              <FormGroup bsSize="large">
                <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl type="text" disabled={true} value={c.get("command")}/>
                </InputGroup>
              </FormGroup>
            </Panel>
          )
        })}
        </PanelGroup>
      )
    }
    else {
      return (<div>No configs yet</div>)
    }
  }

  renderStartingTreeForm() {

    return (
          <InputGroup>
              <InputGroup.Addon>$</InputGroup.Addon>
              <FormControl
                type="text"
                placeholder="Enter the command"
                onChange={(e) => this.changeAddConfigurationForm("command", e)}
                value={this.state.addConfigurationForm.getIn(["command", "value"])}
              />
          </InputGroup>
    )
  }
}
