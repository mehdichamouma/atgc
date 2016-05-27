import React from "react"
import Page from "../components/Page"
import {Tab, Row, Col, Nav, NavItem} from "react-bootstrap"
import WorkersSettings from "./WorkersSettings"

export default class extends React.Component {
  constructor(props) {
      super(props)
      
  }

  render() {
    return (
      <Page title="Settings">

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">
                  Workers
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <WorkersSettings />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Page>
    )
  }
}
