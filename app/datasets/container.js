import React from "react"
import {Table, Row, Glyphicon, Button, Panel, FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import DropZone from "react-dropzone"

export default class Container extends React.Component {

  render() {
    return(
      <div>
          <Row>
          <Panel header={"Upload Datasets"}>
              <DropZone>
                  <div>Drop file here</div>
              </DropZone>

          </Panel>

          </Row>
          <Row>
              <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Filename</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Added at</th>
                      <th>Download</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>ADN.phy</td>
                      <td>DNA</td>
                      <td>descr....</td>
                      <td>175ko</td>
                      <td>21/04/16 20h00</td>
                      <td>
                        <Button><Glyphicon glyph="align-left" /></Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                  </tbody>
              </Table>
          </Row>
      </div>
    )
  }
}
