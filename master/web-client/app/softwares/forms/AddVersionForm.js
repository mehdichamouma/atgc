import React from "react"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel, FormGroup,
  ControlLabel, HelpBlock, FormControl, Form, Checkbox, Radio, Well,
  ListGroup, ListGroupItem, Tabs, Tab, Modal
} from "react-bootstrap"

import DropZone from "react-dropzone"

export default (props) => (
  <form>
    <FormGroup controlId="formControlsText">
      <ControlLabel>Software</ControlLabel>
      <FormControl
          componentClass="select"
          placeholder="select"
          value={props.fields.getIn(["softwareIndex", "value"])}
          onChange={e => props.onChange("software", e)}
      >
          {props.softwares.map((s, index) => {
            return (<option value={index}>{s.get("name")}</option>)
          })}
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsText" validationState={props.fields.getIn(["versionCode", "state"])}>
      <ControlLabel>Version Code</ControlLabel>
      <FormControl
        type="text"
        placeholder="Enter version code"
        value={props.fields.getIn(["versionCode", "value"])}
        onChange={(e) => props.onChange("versionCode", e)}
      />
    </FormGroup>

      <FormGroup controlId="formControlsFile">
        <ControlLabel>Binary File</ControlLabel>
        <DropZone className="dropZone" onDrop={(files) => props.onChange("binaryFile", files[0])} multiple="false">
          <HelpBlock>Add the new version binaryFile</HelpBlock>
        </DropZone>
      </FormGroup>


      <FormGroup controlId="formControlsDescription">
        <ControlLabel>Description</ControlLabel>
        <FormControl
          componentClass="textarea"
          placeholder="Enter the version description"
          value={props.fields.getIn(["description", "value"])}
          onChange={(e) => props.onChange("description", e)}
        />
      </FormGroup>
  </form>
)
