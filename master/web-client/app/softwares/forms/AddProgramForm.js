import React from "react"

import {
  Table, Row, Col, Glyphicon, Button, ButtonGroup, Panel, FormGroup,
  ControlLabel, HelpBlock, FormControl, Form, Checkbox, Radio, Well,
  ListGroup, ListGroupItem, Tabs, Tab, Modal
} from "react-bootstrap"

export default (props) => (
  <form>
    <FormGroup controlId="formControlsText" validationState={props.fields.getIn(["versionCode", "state"])}>
      <ControlLabel>Program name</ControlLabel>
      <FormControl
        type="text"
        placeholder="Enter program name"
        value={props.fields.getIn(["name", "value"])}
        onChange={(e) => props.onChange("name", e)}
      />
    </FormGroup>

    <FormGroup controlId="formControlsDescription">
      <ControlLabel>Program description</ControlLabel>
      <FormControl
        componentClass="textarea"
        placeholder="Enter the program description"
        value={props.fields.getIn(["description", "value"])}
        onChange={(e) => props.onChange("description", e)}
      />
    </FormGroup>
  </form>
)
