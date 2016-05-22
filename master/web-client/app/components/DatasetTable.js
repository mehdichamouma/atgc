import React from "react"
import {Table, ButtonGroup, Button, Glyphicon, Checkbox} from "react-bootstrap"
import {Link} from "react-router"
import moment from "moment"
import filesize from "filesize"
import dataset from "../libs/api/dataset"
import {List} from "immutable"

export default class extends React.Component {
  rowSelected(d) {
    if(this.props.onSelect) {
      this.props.onSelect(d)
    }
  }


  render() {
    let {datasets, selectable, onSelect, noAction,
        selectedRows = List(),
        ...rest} = this.props

    return (
      <Table {...rest}>
          <thead>
            <tr>
              {selectable ? (<th></th>) : null}
              <th>Filename</th>
              <th>Taxa</th>
              <th>bp</th>
              <th>Type</th>
              <th>Description</th>
              <th>Starting Trees</th>
              <th>Size</th>
              <th>Added at</th>
              {!noAction ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {this.props.datasets.map(d => {
              let selected = (typeof selectedRows.keyOf(d) !== "undefined")
              let classNames = []
              if(selected) classNames.push("success")
              if(selectable) classNames.push("cursor-pointer")
              let check, actions
              if(selectable) {
                check = (<td><Checkbox checked={selected} onClick={() => this.rowSelected(d)} /></td>)
              }
              if(!noAction) {
                actions = (
                  <td>
                    <ButtonGroup>
                      <Button componentClass="a" href={dataset.getDownloadLink(d.get("_id"))} target="_blank"><Glyphicon glyph="download-alt" /></Button>
                      <Button componentClass={Link} to={`/datasets/${d.get("_id")}`}><Glyphicon glyph="pencil" /></Button>
                    </ButtonGroup>
                  </td>
                )
              }
              return (
                <tr onClick={() => this.rowSelected(d)} className={classNames.join(" ")}>
                  {check}
                  <td>{d.get("title")}</td>
                  <td>{d.get("nSpecis") || "NA"}</td>
                  <td>{d.get("sequenceLength") || "NA"}</td>
                  <td>{d.get("type")}</td>
                  <td>{d.get("description")}</td>
                  <td>{d.get("starting_trees") ? d.get("starting_trees").size : "-"}</td>
                  <td>{filesize(d.get("size") || 0)}</td>
                  <td>{d.get("createdAt") ? moment(d.get("createdAt")).format("LLL") : "-"}</td>
                  {actions}
                </tr>
              )
            })}
          </tbody>
      </Table>
    )
  }
}
