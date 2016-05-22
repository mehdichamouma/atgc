import React from "react"
import Page from "../components/Page"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel, FormGroup,
  ControlLabel, FormControl, Form, Checkbox, Radio,
  ListGroup, ListGroupItem, Alert, Modal, HelpBlock, Well
} from "react-bootstrap"

import {Map, List, fromJS} from "immutable"
import DropZone from "react-dropzone"
import upload from "../libs/api/upload"
import dataset from "../libs/api/dataset"

import filesize from "filesize"
import moment from "moment"
import path from "path"

import TreesTable from "../components/TreesTable"

export default class EditDataset extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataset: Map(),
      showTreeForm: false,
      treeForm: fromJS({
        label: {
          value: "",
          state: ""
        },
        description: {
          value: "",
          state: ""
        },
        file: {
          value: null,
          state: ""
        }
      })
    }
  }

  componentWillMount(nextProps) {
    this.refresh()
  }

  refresh() {
    let {id} = this.props.params
    dataset.get(id).then(output => {
      this.setState({
        dataset: fromJS(output)
      })
    })
  }
  submitTree() {
    let file = this.state.treeForm.getIn(["file", "value"])
    upload.process([file]).then(res => {
      dataset.addTree(this.state.dataset.get("_id"), {
        uploadId: res.upload_id,
        label: this.state.treeForm.getIn(["label", "value"]),
        description: this.state.treeForm.getIn(["description", "value"])
      }).then(res2 => {
        this.setState({showTreeForm: false})
        this.refresh()
      })
    })
  }

  onTreeFormChange(field, e) {
    let value = (field === "file") ? e : e.target.value
    console.log(value);
    this.setState({
      treeForm: this.state.treeForm.setIn([field, "value"], value)
    })
  }


  render() {
      return(
        <Page title={`${this.state.dataset.get("title")} configuration`}>

            <Row>
              <Col md={8}>
                <Panel header={"Starting trees"}>
                  <Button onClick={() => this.setState({showTreeForm: true})}>Add a starting tree</Button>
                  <TreesTable dsId={this.state.dataset.get("_id")} trees={this.state.dataset.get("starting_trees")}/>
                </Panel>
              </Col>
              <Col md={4}>
                <Panel header={"Informations"}>
                </Panel>
              </Col>
            </Row>
            <Modal show={this.state.showTreeForm} onHide={() => this.setState({showTreeForm: false})}>
              <Modal.Header closeButton>
                  <Modal.Title>New Starting Tree</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <FormGroup controlId="formControlsText">
                    <ControlLabel>Label</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter a label"
                        value={this.state.treeForm.getIn(["label", "value"])}
                        onChange={e => this.onTreeFormChange("label", e)}
                    />
                  </FormGroup>

                    <FormGroup controlId="formControlsFile">
                      <ControlLabel>Binary File</ControlLabel>
                      <DropZone className="dropZone" onDrop={(files) => this.onTreeFormChange("file", files[0])} multiple={false}>
                        <HelpBlock>
                            {this.state.treeForm.getIn(["file", "value"]) ?  this.state.treeForm.getIn(["file", "value"]).name : "Add the new starting tree"}
                        </HelpBlock>
                      </DropZone>
                    </FormGroup>


                    <FormGroup controlId="formControlsDescription">
                      <ControlLabel>Description</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        placeholder="Enter the version description"
                        value={this.state.treeForm.getIn(["description", "value"])}
                        onChange={(e) => this.onTreeFormChange("description", e)}
                      />
                    </FormGroup>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.submitTree.bind(this)}><Glyphicon glyph="upload" /> Submit</Button>
              </Modal.Footer>
            </Modal>
        </Page>
      )
  }
}
