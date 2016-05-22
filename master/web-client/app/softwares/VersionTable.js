import React from "react"
import {Table, Button, ButtonGroup, Glyphicon, Label} from "react-bootstrap"
import filesize from "filesize"

export default (props) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Version Code</th>
          <th>Size</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.versions && props.versions.map(v => {
          return (
            <tr>
              <td><Label bsStyle="primary">{v.get("code")}</Label></td>
              <td>{filesize(v.getIn(["binary", "size"]))}</td>
              <td>{v.get("description")}</td>
              <td>
                <ButtonGroup>
                  <Button><Glyphicon glyph="download-alt" /></Button>
                  <Button><Glyphicon glyph="pencil" /></Button>
                </ButtonGroup>
              </td>
            </tr>
          )
        })}

      </tbody>
    </Table>
  )
}
