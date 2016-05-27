import React from "react"
import Page from "../components/Page"
import {Link} from "react-router"
import {Table, Button, Glyphicon} from "react-bootstrap"

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Label</th>
              <th>Number Of Datasets</th>
              <th>Number Of Configurations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.tests.map(t => {
              return (
                <tr>
                  <td>{t.label}</td>
                  <td>{t.nDatasets}</td>
                  <td>{t.nConfig}</td>
                  <td>
                    <Button componentClass={Link} to="/tests/show"><Glyphicon glyph="eye-open"/></Button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>
    )
  }
}
