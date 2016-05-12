import React from "react"
import SideMenu from "./SideMenu"

export default class Page extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <SideMenu />
        <div id="page-wrapper">
          <div className="row">
              <div className="col-lg-12">
                  <h1 className="page-header">Dashboard</h1>
              </div>
          </div>
            {this.props.children}
        </div>
      </div>
    )
  }
}
