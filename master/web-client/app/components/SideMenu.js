import React from "react"
import { Link } from 'react-router'

export default class SideMenu extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html">ATGC: Benchmarking tool</a>
          </div>
          <div className="navbar-default sidebar" role="navigation">
              <div className="sidebar-nav navbar-collapse">
                  <ul className="nav" id="side-menu">
                      <li>
                          <Link to="/" ><i className="fa fa-dashboard fa-fw"></i> Dashboard</Link>
                      </li>
                      <li>
                          <Link to="/tests/new"><i className="glyphicon glyphicon-play-circle"></i> Create a test</Link>
                          <Link to="/tests/current"><i className="glyphicon glyphicon-refresh"></i> Running Tests</Link>
                          <Link to="/tests/history"><i className="fa fa-bar-chart-o fa-fw"></i> Test history</Link>
                      </li>
                      <li>
                          <Link to="/datasets"><i className="fa fa-table fa-fw"></i>Manage datasets</Link>
                      </li>
                      <li>
                          <Link to="/softwares"><i className="glyphicon glyphicon-floppy-disk fa-fw"></i>Manage programs</Link>
                      </li>
                      <li>
                          <Link to="/settings"><i className="glyphicon glyphicon-cog"></i>Settings</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
}
