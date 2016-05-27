import React from "react"
import {range, minBy, maxBy} from "lodash"
import {Table, ListGroup, ListGroupItem, Label, Button, Glyphicon, Panel, Badge} from "react-bootstrap"
import {humanizer} from "../libs/helpers"

export default class extends React.Component {
  render() {
    let {datasets, configurations, results} = this.props

    return (
      <Table responsive fill={this.props.fill}>
        <thead>
          <tr>
              <th></th>
              {configurations.map(c => {
                return (
                    <th>
                      <h4><Label bsStyle="primary">{c.name}</Label>{" "}<Badge bsStyle={"primary"}>{c.versionCode}</Badge></h4>
                    </th>
                )
              })}
          </tr>
        </thead>
        <tbody>
          <tr className="active">
            <td>Configuration</td>
              {configurations.map(c => {
                return (
                    <td>{c.configuration.label}</td>
                )
              })}
          </tr>
          {datasets.map((d, i) => {
            let bestTime = minBy(results[i], r => r ? r.time : null)
            let bestMax = maxBy(results[i], r=> r ? r.max : null)

            return (
              <tr>
                <td>{d.title}</td>
                {range(0, configurations.length).map(j => {
                  let r = (results && results[i]) ? results[i][j] : null
                  let isMinTime = (r === bestTime)
                  let isMax = (r === bestMax)

                  if(!r) {
                    return (<td className={"warning"}>No results</td>)
                  }
                  return(
                    <td>
                        <Panel>
                          <Label bsStyle={isMinTime ? "success" : "default"}>
                              <small>{humanizer(r.time, {language: "fr"})}</small>
                          </Label>
                          <br/>
                          <Label bsStyle={isMax ? "success": "default"}>{r.max}</Label>
                          <br /><br/>
                          <Button bsSize="xsmall">
                            <Glyphicon glyph="eye-open"/> output
                          </Button>
                        </Panel>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
