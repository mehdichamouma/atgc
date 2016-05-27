import React from "react"
import {Panel, Table, Form, FormGroup, ControlLabel, Button, FormControl} from "react-bootstrap"
import {fromJS, List} from "immutable"
import worker from "../libs/api/worker"

export default class WorkersSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: fromJS({
        host: {
          value: "",
          error: null
        }
      }),
      workers: List()
    }
  }

  componentWillMount() {
      this.loadWorkers()
  }

  submit() {
    worker.add({
      host: this.state.form.getIn(["host", "value"])
    }).then(() => {
      this.loadWorkers()
    })
  }

  loadWorkers() {
    worker.all().then(workers => {
      this.setState({
        workers: fromJS(workers)
      })
    })
  }
  render() {
    return (
      <div>
        <Panel>
            <Form componentClass="div" inline>
              <FormGroup controlId="formInlineName">
                <ControlLabel>Host</ControlLabel>
                {' '}
                <FormControl
                  type="text"
                  placeholder="ip address or domain"
                  value={this.state.form.getIn(["host", "value"])}
                  onChange={(e) => this.setState({form: this.state.form.setIn(["host", "value"], e.target.value)})}
                />
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.submit.bind(this)}>
                Add a worker
              </Button>
            </Form>
        </Panel>
        <Panel>
          <Table>
            <thead>
              <tr>
                <th>Host</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.workers.map(w => {
                return (
                  <tr>
                    <td>{w}</td>
                    <td></td>
                  </tr>
                )
              })}


            </tbody>
          </Table>
        </Panel>
      </div>
    )
  }
}
