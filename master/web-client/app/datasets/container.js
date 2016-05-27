import React from "react"
import Page from "../components/Page"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel, FormGroup,
  ControlLabel, FormControl, Form, Checkbox, Radio,
  ListGroup, ListGroupItem, Alert
} from "react-bootstrap"

import {Map, List, fromJS} from "immutable"
import DropZone from "react-dropzone"
import upload from "../libs/api/upload"
import dataset from "../libs/api/dataset"

import filesize from "filesize"
import moment from "moment"
import path from "path"

import {Link} from "react-router"

import DatasetTable from "../components/DatasetTable"

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: fromJS({
        files: [],
        description: "",
        type: "d"
      }),
      wrongTypeError: false,
      datasets: List()
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    dataset.all().then(output => {
      this.setState({
        datasets: fromJS(output)
      })
    })
  }
  changeDescription(e) {
    this.setState({
      form: this.state.form.set("description", e.target.value)
    })
  }

  changeType(val) {
    this.setState({
      form: this.state.form.set("type", val)
    })
  }

  onDrop(files) {
    let phyFiles = files.filter(f => path.extname(f.name) === ".phy")
    this.setState({
      form: this.state.form.update("files", old => old.push(...phyFiles)),
      wrongTypeError: files.length != phyFiles.length
    })
  }

  upload() {
    upload.process(this.state.form.get("files").toJS()).then(res => {
      console.log(res)
      dataset.post({
        upload_id: res.upload_id,
        description: this.state.form.get("description"),
        type: this.state.form.get("type")
      }).then(res2 => {
        console.log(res2)
        this.refresh()
      })
    })
    .catch(e => console.log(e))
  }

  render() {
    let wrongTypeMessage
    if(this.state.wrongTypeError) wrongTypeMessage = (<p><strong>Wrong type</strong></p>)

    return(
      <Page title="Datasets">
          <Row>
          <Panel header={"Upload Datasets"}>
              <Col md={4}>
                <DropZone className="dropZone" onDrop={this.onDrop.bind(this)}>
                    Drop files here
                    <ListGroup>
                      {this.state.form.get("files").map(f => {
                        return (<ListGroupItem>{f.name}</ListGroupItem>)
                      })}
                    </ListGroup>
                    <Alert bsStyle={this.state.wrongTypeError ? "danger" : "warning"}>
                        {wrongTypeMessage}
                                  Only <strong>.phy</strong> extensions are supported.
                    </Alert>
                </DropZone>
              </Col>
              <Col md={8}>
                <Form componentClass="div" horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                      <Col componentClass={ControlLabel} sm={2}>
                        Description
                      </Col>
                      <Col sm={10}>
                        <FormControl
                          componentClass="textarea"
                          placeholder="description"
                          onChange={this.changeDescription.bind(this)}
                          value={this.state.form.get("description")}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={2}>
                        Type
                      </Col>
                      <Col sm={10}>
                        <Radio inline onChange={() => this.changeType("d")} checked={this.state.form.get("type") === "d"}>DNA</Radio>
                        {' '}
                        <Radio inline onChange={() => this.changeType("p")} checked={this.state.form.get("type") === "p"}>Protein</Radio>
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col smOffset={2} sm={10}>
                        <Button type="submit" onClick={this.upload.bind(this)}>
                          Upload
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
              </Col>
          </Panel>

          </Row>
          <Row>
              <DatasetTable
                striped bordered condensed hover responsive
                datasets={this.state.datasets}
              />
          </Row>
      </Page>
    )
  }
}
