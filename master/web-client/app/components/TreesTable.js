import React from "react"
import {Table, Alert, Button, ButtonGroup, Glyphicon, Checkbox, Modal, Well} from "react-bootstrap"
import TreeVizualiser from "./TreeVizualiser"
import dataset from "../libs/api/dataset"

import filesize from "filesize"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      urlTree: null
    }
  }

  quickView(t) {
    this.setState({
      urlTree: dataset.getStartTreeDownloadLink(
        this.props.dsId,
        t.get("_id")
      )
    })
  }

  render() {
    let {dsId, trees, selectable, onSelect, selectedRows, ...rest} = this.props
    var Trees, _alert
    if(trees) {
      Trees = trees.map((t, index) => {
              let check
              if(selectable) {
                let checked = selectedRows.includes(index)
                check = (<td><Checkbox checked={checked} onClick={() => onSelect(index)}/></td>)
              }
              return (
                <tr>
                    {check}
                    <td>{t.get("label")}</td>
                    <td>{t.get("description")}</td>
                    <td>{filesize(t.get("size"))}</td>
                    <td>
                      <ButtonGroup>
                        <Button onClick={() => this.quickView(t)}><Glyphicon glyph="grain"/></Button>
                      </ButtonGroup>
                    </td>
                </tr>
              )
          })
    }
    else {
      _alert = (<Alert bsStyle="warning">No trees yet</Alert>)
    }

    return (
      <div>
      <Table {...rest}>
        <thead>
          <tr>
            {selectable ? (<th></th>) : null}
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
      <Modal dialogClassName="modal-tree-view" show={(this.state.urlTree != null)} onHide={() => this.setState({urlTree: null})}>
        <Modal.Header closeButton>
            <Modal.Title>Tree Vizualisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Well>
          <TreeVizualiser className="center" url={this.state.urlTree}/>
          </Well>
        </Modal.Body>
      </Modal>
    </div>
    )
  }
}
