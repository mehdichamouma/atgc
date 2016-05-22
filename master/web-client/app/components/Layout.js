import React from "react"
import SideMenu from "./SideMenu"

export default class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <SideMenu />
        <div id="page-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}
