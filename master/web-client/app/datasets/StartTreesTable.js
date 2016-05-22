import React from "react"
import {Table, Alert, Button, ButtonGroup, Glyphicon} from "react-bootstrap"

import filesize from "filesize"

export default class extends React.Component {
  render() {
    var Trees, _alert
    if(this.props.trees) {
      Trees = this.props.trees.map(t => (
                <tr>
                    <td>{t.get("label")}</td>
                    <td>{t.get("description")}</td>
                    <td>{filesize(t.get("size"))}</td>
                    <td>
                      <ButtonGroup>
                        <Button onClick={() => this.props.onClick(t)}><Glyphicon glyph="grain"/></Button>
                      </ButtonGroup>
                    </td>
                </tr>))
    }
    else {
      _alert = (<Alert bsStyle="warning">No trees yet</Alert>)
    }
    return (
      <div>
      <Table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Description</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {Trees}
        </tbody>
      </Table>
      {_alert}
    </div>
    )
  }
}
