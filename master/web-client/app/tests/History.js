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
      <Page header="Tests history">
        <Table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Number Of Datasets</th>
              <th>Number Of Configurations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test #1 (for testing)</td>
              <td>5</td>
              <td>5</td>
              <td>
                <Button componentClass={Link} to="/tests/show"><Glyphicon icon="eye"/></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Page>
    )
  }
}
